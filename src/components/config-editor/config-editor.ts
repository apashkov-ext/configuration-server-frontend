import { OptionDto } from '@/types/dto/option-dto';
import { OptionGroupDto } from '@/types/dto/option-group-dto';
import { OptionValueType } from '@/types/option-value-type.enum';
import { Component, Vue, Prop } from 'vue-property-decorator';
import OptionGroupView from './option-group-view/option-group-view.vue';

@Component({
  components: { OptionGroupView }
})
export class ConfigEditor extends Vue {
  @Prop() data!: OptionGroupDto;
}
