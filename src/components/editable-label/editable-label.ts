import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export class EditableLabel extends Vue {
    @Prop() value!: string;
    @Prop() tooltip!: string;

    private get el(): HTMLInputElement {
        return (this.$refs.valueInput as any).$el as HTMLInputElement;
    }

    editorMode = false;
    temp = this.value;

    edit() {
        if (this.editorMode) {
            return;
        }
        this.editorMode = true;
        this.temp = this.value; 
        this.focus();
    }

    cancel() {
        this.editorMode = false;
        this.temp = this.value;
        this.blur();
        this.input(this.value);
    }

    commit(val: string) {
        this.editorMode = false;
        this.blur();
        this.input(val);
        if (this.value === val) {
            return;
        }
        
        this.$emit('change', val);
    }

    private focus() {
        this.$nextTick(() => (this.$refs.valueInput as any).$el.focus());
    }

    private blur() {
        this.el.blur();
    }

    private input(val: string) {
        this.el.value = val;
        this.el.dispatchEvent(new Event('input'));
    }
}