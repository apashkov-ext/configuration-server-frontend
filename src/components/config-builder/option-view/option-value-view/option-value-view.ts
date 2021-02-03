import { Component, Vue, Prop } from 'vue-property-decorator';
import { OptionValueType } from '@/types/option-value-type.enum';
import StringValueView from './string-value-view/string-value-view.vue';
import NumberValueView from './number-value-view/number-value-view.vue';
import BooleanValueView from './boolean-value-view/boolean-value-view.vue';
import { ChangeValueEvent } from '@/types/events/change-value-event';

@Component({
    components: { StringValueView, NumberValueView, BooleanValueView }
})
export class OptionValueView extends Vue {
    @Prop() value!: any;
    @Prop() type!: OptionValueType;

    OptionValueType = OptionValueType;

    changeValue(e: ChangeValueEvent<any>) {
        this.$emit('change', e);
    }
}