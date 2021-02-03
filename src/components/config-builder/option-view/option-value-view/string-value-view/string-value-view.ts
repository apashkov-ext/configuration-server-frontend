import { ChangeValueEvent } from '@/types/events/change-value-event';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export class StringValueView extends Vue {
    @Prop() content!: string;

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

    commit(val: string) {
        this.editorMode = false;
        this.blur();
        if (this.content === val) {
            return;
        }
        
        this.$emit('change', <ChangeValueEvent<string>>{ oldValue: this.content, newValue: val });
    }

    private blur() {
        (this.$refs.valueInput as any).blur();
    }
}