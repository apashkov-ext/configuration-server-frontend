import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export class PropertyName extends Vue {
    @Prop() value!: string;
    @Prop() separator!: string;

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

    resize() {
        const el = (this.$refs.valueInput as any).$el as HTMLInputElement;
        el.width = el.width + 5;
    }

    private focus() {
        this.$nextTick(() => (this.$refs.valueInput as any).$el.focus());
    }

    private blur() {
        (this.$refs.valueInput as any).$el.blur();
    }

    private input(val: string) {
        const el = (this.$refs.valueInput as any).$el as HTMLInputElement;
        el.value = val;
        el.dispatchEvent(new Event('input'));
    }
}