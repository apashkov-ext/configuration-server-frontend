import { Component, Vue, Prop } from 'vue-property-decorator';
import StringValueView from '../string-value-view/string-value-view.vue';
import NumberValueView from '../number-value-view/number-value-view.vue';
import ExpandableCodeGroup from '../../expandable-code-group/expandable-code-group.vue';
import NewItem from '@/components/new-item.vue';
import EditableLabel from '@/components/editable-label/editable-label.vue';
import { Modals } from '@/core/modals';

type ElementType = 'string' | 'number';

@Component({
  components: {
    StringValueView,
    NumberValueView,
    ExpandableCodeGroup,
    NewItem,
    EditableLabel
  }
})
export class ArrayValueView extends Vue {
  @Prop() id!: string;
  @Prop() name!: string;
  @Prop() value!: any[];
  @Prop() elementsType!: ElementType;
  @Prop() description!: string;

  changeElem(newValue: any, index: number) {
    if (this.value[index] === newValue) {
      return;
    }

    const changed = this.value.slice();
    changed[index] = newValue;

    this.$emit('changeValue', changed);
  }

  addValue(value: string) {
    const converted = this.convertToType(value, this.elementsType);
    const changed = this.value.slice();
    changed.push(converted);

    this.$emit('changeValue', changed);
  }

  async removeElem(value: any, index: number) {
    Modals.showConfirm('Delete element from array', `Are you sure you want to delete element [${value}] from array?`)
      .subscribe(res => {
        if (!res) {
          return;
        }

        const changed = this.value.slice();
        changed.splice(index, 1)  
        this.$emit('changeValue', changed);
      });
  }

  private convertToType(val: string, type: ElementType): any {
    switch (type) {
      case 'string':
        return val;
      case 'number':
        return +val;
      default:
        throw new Error('Invalid array element');
    }
  }
}
