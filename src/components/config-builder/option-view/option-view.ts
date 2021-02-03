import { Component, Vue, Prop } from 'vue-property-decorator';
import NewItem from '@/components/new-item.vue'
import OptionValueView from './option-value-view/option-value-view.vue'
import { OptionDto } from '@/types/dto/option-dto';
import { ChangeValueEvent } from '@/types/events/change-value-event';

@Component({
    components: { NewItem, OptionValueView }
})
export class OptionView extends Vue {
    @Prop() content!: OptionDto;

    changeOptionValue(e: ChangeValueEvent<any>) {
        console.log(e);
        if (e.oldValue !== e.newValue) {
            this.content.value = e.newValue;
        }
    }
}