import { OptionGroupDto } from '@/types/dto/option-group-dto';
import { Component, Vue, Prop } from 'vue-property-decorator';
import OptionGroupView from './option-group-view/option-group-view.vue';

@Component({
  components: { OptionGroupView }
})
export class ConfigEditor extends Vue {
  @Prop() data!: OptionGroupDto;
}
