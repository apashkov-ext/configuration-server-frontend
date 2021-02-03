import { Component, Vue, Prop } from 'vue-property-decorator';
import NewItem from '@/components/new-item.vue'
import { OptionValueType } from '@/types/option-value-type.enum';
import { OptionDto } from '@/types/dto/option-dto';

@Component({
    components: { NewItem }
})
export class OptionView extends Vue {
    @Prop() content!: OptionDto;
}