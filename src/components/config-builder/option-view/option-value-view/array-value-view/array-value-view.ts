import { ChangeValueEvent } from '@/types/events/change-value-event';
import { Component, Vue, Prop } from 'vue-property-decorator';
import StringValueView from '../string-value-view/string-value-view.vue';
import NumberValueView from '../number-value-view/number-value-view.vue';

@Component({
    components: { StringValueView, NumberValueView }
})
export class ArrayValueView extends Vue {
    @Prop() content!: any[];
    @Prop() elementsType!: 'string' | 'number';

    changeElem(elem: any, index: number) {
        const changed = this.content;
        changed[index] = elem;
        this.$emit('change', <ChangeValueEvent<any[]>>{ oldValue: this.content, newValue: changed });
    }

}