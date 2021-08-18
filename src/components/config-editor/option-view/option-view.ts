import { Component, Vue, Prop } from 'vue-property-decorator';
import NewItem from '@/components/new-item.vue';
import { Inject } from 'di-corate';
import { OptionsApi } from './options-api';
import { BusyOverlay } from '@/core/busy-overlay';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OptionValueType } from '@/domain/option-value-type.enum';
import StringValueView from './string-value-view/string-value-view.vue';
import NumberValueView from './number-value-view/number-value-view.vue';
import BooleanValueView from './boolean-value-view/boolean-value-view.vue';
import ArrayValueView from './array-value-view/array-value-view.vue';
import { ComponentWithData } from '@/core/component-with-data';
import { Option } from '@/domain';

@Component({
  components: {
    NewItem,
    StringValueView,
    NumberValueView,
    BooleanValueView,
    ArrayValueView
  }
})
export class OptionView extends ComponentWithData<Option> {
  private unsubscribe = new Subject();

  @Inject(BusyOverlay) private readonly busy!: BusyOverlay;
  @Inject(OptionsApi) private readonly api!: OptionsApi;

  OptionValueType = OptionValueType;

  changeValue(value: any) {
    if (this.data.value === value) {
      return;
    }

    this.busy.showBusy();
    this.backup();
    this.data.updateValue(value);
    this.api.update(this.data.id, this.data.name, this.data.description, this.data.value, this.data.type);
  }

  changeName(name: string) {
    if (this.data.name === name) {
      return;
    }

    this.busy.showBusy();
    this.backup();
    this.data.updateName(name);
    this.api.update(this.data.id, this.data.name, this.data.description, this.data.value, this.data.type);
  }

  created() {
    this.api.onError.pipe(takeUntil(this.unsubscribe)).subscribe(e => {
      this.rollback();
      this.busy.hideBusy();
    });

    this.api.updated.pipe(takeUntil(this.unsubscribe)).subscribe(x => {
      this.busy.hideBusy();
    });
  }

  beforeDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
