import { Component, Prop, Vue } from 'vue-property-decorator';
import EditableLabel from '@/components/editable-label/editable-label.vue';
import { Brackets } from './brackets.enum';

@Component({
  components: { EditableLabel }
})
export class ExpandableCodeGroup extends Vue {
  @Prop() name!: string;
  @Prop() brackets!: Brackets;
  @Prop() tooltip!: string;
  @Prop() deletable!: boolean;

  bracketsView = {
    left: this.brackets && this.brackets[0] || '',
    right: this.brackets && this.brackets[1] || ''
  };

  expanded = true;
}
