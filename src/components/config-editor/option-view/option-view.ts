import { Component, Vue, Prop } from 'vue-property-decorator';
import NewItem from '@/components/new-item.vue'
import { OptionDto } from '@/types/dto/option-dto';
import { ChangeValueEvent } from '@/types/events/change-value-event';
import { PropInject } from 'di-corate';
import { OptionsApi } from './options-api';
import { BusyOverlay } from '@/core/busy-overlay';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OptionValueType } from '@/types/option-value-type.enum';
import StringValueView from './string-value-view/string-value-view.vue';
import NumberValueView from './number-value-view/number-value-view.vue';
import BooleanValueView from './boolean-value-view/boolean-value-view.vue';
import ArrayValueView from './array-value-view/array-value-view.vue';

@Component({
    components: { NewItem, StringValueView, NumberValueView, BooleanValueView, ArrayValueView }
})
export class OptionView extends Vue {
    private unsubscribe = new Subject();

    @Prop() content!: OptionDto;
    @PropInject('BusyOverlay') private readonly busy!: BusyOverlay;
    @PropInject(OptionsApi) private readonly api!: OptionsApi;

    OptionValueType = OptionValueType;

    changeValue(e: ChangeValueEvent<any>) {
        if (e.oldValue !== e.newValue) {
            this.updateOption(this.content.name, this.content.description, e.newValue, this.content.type); 
        }
    }

    private updateOption(name: string, desc: string, val: any, type: OptionValueType) {
        this.busy.showBusy();
        this.api.update(this.content.id, name, desc, val, type);
    }

    created() {
        this.api.updated.pipe(takeUntil(this.unsubscribe)).subscribe(x => {
            this.content.name = x.name;
            this.content.description = x.description;
            this.content.value = x.value;
            this.busy.hideBusy();
        })
    }
}