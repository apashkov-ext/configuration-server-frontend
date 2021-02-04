import { ChangeValueEvent } from '@/types/events/change-value-event';
import { Component, Vue, Prop } from 'vue-property-decorator';
import StringValueView from '../string-value-view/string-value-view.vue';
import NumberValueView from '../number-value-view/number-value-view.vue';
import ExpandableCodeGroup from '../../expandable-code-group/expandable-code-group.vue'
import NewItem from '@/components/new-item.vue'

@Component({
    components: { StringValueView, NumberValueView, ExpandableCodeGroup, NewItem }
})
export class ArrayValueView extends Vue {
    @Prop() name!: string;
    @Prop() content!: any[];
    @Prop() elementsType!: 'string' | 'number';

    changeElem(elem: ChangeValueEvent<any>, index: number) {
        const changed = this.content.slice();
        if (elem.oldValue !== elem.newValue) {
            changed[index] = elem.newValue;
        }
        
        this.$emit('changeValue', <ChangeValueEvent<any[]>>{ oldValue: this.content, newValue: changed });
    }

    addValue(e: string) {

    }
}