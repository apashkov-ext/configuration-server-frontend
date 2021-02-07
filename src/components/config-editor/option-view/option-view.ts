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
import { ComponentWithData } from '@/core/component-with-data';

@Component({
    components: { NewItem, StringValueView, NumberValueView, BooleanValueView, ArrayValueView }
})
export class OptionView extends ComponentWithData<OptionDto> {
    private unsubscribe = new Subject();

    @PropInject('BusyOverlay') private readonly busy!: BusyOverlay;
    @PropInject(OptionsApi) private readonly api!: OptionsApi;

    OptionValueType = OptionValueType;

    changeValue(e: any) {
        if (this.data.value !== e) {
            this.updateOption(this.data.name, this.data.description, e.newValue, this.data.type);
        }
    }

    changeName(e: string) {
        if (this.data.name !== e) {
            this.updateOption(e, this.data.description, this.data.value, this.data.type); 
        }
    }

    private updateOption(name: string, desc: string, val: any, type: OptionValueType) {
        this.busy.showBusy();
        this.backup();
        this.data.name = name;
        this.data.description = desc;
        this.data.value = val;
        this.data.type = type;
        this.api.update(this.data.id, name, desc, val, type);
    }

    created() {
        this.api.onError.pipe(takeUntil(this.unsubscribe)).subscribe(e => {
            this.rollback();
        });

        this.api.updated.pipe(takeUntil(this.unsubscribe)).subscribe(x => {
            this.data.name = x.name;
            this.data.description = x.description;
            this.data.value = x.value;
            this.busy.hideBusy();
        })
    }

    beforeDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}