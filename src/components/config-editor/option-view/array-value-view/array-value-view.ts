import { ChangeValueEvent } from '@/types/events/change-value-event';
import { Component, Vue, Prop } from 'vue-property-decorator';
import StringValueView from '../string-value-view/string-value-view.vue';
import NumberValueView from '../number-value-view/number-value-view.vue';
import ExpandableCodeGroup from '../../expandable-code-group/expandable-code-group.vue';
import NewItem from '@/components/new-item.vue';
import EditableLabel from '@/components/editable-label/editable-label.vue';

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
  @Prop() name!: string;
  @Prop() value!: any[];
  @Prop() elementsType!: ElementType;
  @Prop() description!: string;

  changeElem(elem: ChangeValueEvent<any>, index: number) {
    const changed = this.value.slice();
    if (elem.oldValue !== elem.newValue) {
      changed[index] = elem.newValue;
    }

    this.$emit('changeValue', changed);
  }

  addValue(value: string) {
    const converted = this.convertToType(value, this.elementsType);
    const changed = this.value.slice();
    changed.push(converted);

    this.$emit('changeValue', changed);
  }

  changeName(e: string) {
    this.$emit('changeName', e);
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
