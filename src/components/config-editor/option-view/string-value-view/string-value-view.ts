import { Component, Vue, Prop } from 'vue-property-decorator';
import EditableLabel from '@/components/editable-label/editable-label.vue';

@Component({
  components: { EditableLabel }
})
export class StringValueView extends Vue {
  @Prop() name!: string;
  @Prop() value!: string;
  @Prop() description!: string;

  editorMode = false;
  temp = {
    value: this.value
  };

  constructor() {
    super();
    this.temp.value = this.value;
  }

  edit() {
    if (this.editorMode) {
      return;
    }
    this.editorMode = true;
    this.temp.value = this.value;
  }

  cancel() {
    this.editorMode = false;
    this.temp.value = this.value;
    this.blur();
  }

  commit(val: string) {
    this.editorMode = false;
    this.blur();
    if (this.value === val) {
      return;
    }

    this.$emit('changeValue', val);
  }

  private blur() {
    (this.$refs.valueInput as any).blur();
  }
}
