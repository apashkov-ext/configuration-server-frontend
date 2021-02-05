import { ChangeValueEvent } from '@/types/events/change-value-event';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export class BooleanValueView extends Vue {
    @Prop() name!: string;
    @Prop() content!: boolean;

    options = [
        { value: false, text: 'false' },
        { value: true, text: 'true' }
    ];

    value = !!this.content;

    change(val: boolean) {
        this.$emit('changeValue', <ChangeValueEvent<boolean>>{ oldValue: this.content, newValue: val });
    }
}