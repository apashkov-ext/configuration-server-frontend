import { ChangeValueEvent } from '@/types/events/change-value-event';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export class NumberValueView extends Vue {
    @Prop() name!: string;
    @Prop() content!: number;

    editorMode = false;
    temp = this.content;

    edit() {
        if (this.editorMode) {
            return;
        }
        this.editorMode = true;
        this.temp = this.content; 
    }

    cancel() {
        this.editorMode = false;
        this.temp = this.content;
        this.blur();
    }

    commit(val: any) {
        this.editorMode = false;
        this.blur();
        if (this.content === +val) {
            return;
        }
        
        this.$emit('changeValue', <ChangeValueEvent<number>>{ oldValue: this.content, newValue: +val });
    }

    private blur() {
        (this.$refs.valueInput as any)
    }
}