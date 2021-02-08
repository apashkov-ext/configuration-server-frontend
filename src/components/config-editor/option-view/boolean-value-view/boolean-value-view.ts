import { Component, Vue, Prop } from 'vue-property-decorator';
import EditableLabel from '@/components/editable-label/editable-label.vue';

@Component({
  components: { EditableLabel }
})
export class BooleanValueView extends Vue {
  @Prop() name!: string;
  @Prop() value!: boolean;
  @Prop() description!: string;

  options = [
    { value: false, text: 'false' },
    { value: true, text: 'true' }
  ];

  isTrue = !!this.value;

  changeValue(val: boolean) {
    this.$emit('changeValue', val);
  }
  changeName(e: string) {
    this.$emit('changeName', e);
  }
}
