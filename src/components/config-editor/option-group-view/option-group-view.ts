import { Component, Vue, Prop } from 'vue-property-decorator';
import OptionView from '../option-view/option-view.vue'
import NewItem from '@/components/new-item.vue'
import { OptionGroupDto } from '@/types/dto/option-group-dto';

@Component({
    components: { OptionView, NewItem }
})
export class OptionGroupView extends Vue {
    @Prop() content!: OptionGroupDto;

 expanded = true;

 addProperty(name: string) {
     
 }
}