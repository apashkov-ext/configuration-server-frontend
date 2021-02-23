import { Component } from 'vue-property-decorator';
import OptionView from '../option-view/option-view.vue';
import NewItem from '@/components/new-item.vue';
import ExpandableCodeGroup from '../expandable-code-group/expandable-code-group.vue';
import { OptionGroupDto } from '@/types/dto/option-group-dto';
import { Inject } from 'di-corate';
import { OptionGroupsApi } from './option-group-api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BusyOverlay } from '@/core/busy-overlay';
import { TemplateParser } from './template-parsing/template-parser';
import { OptionValueType } from '@/types/option-value-type.enum';
import { ComponentWithData } from '@/core/component-with-data';
import { ParsedValueType } from './template-parsing/template';
import { Modals } from '@/components/modals';

@Component({
  components: { OptionView, NewItem, ExpandableCodeGroup }
})
export class OptionGroupView extends ComponentWithData<OptionGroupDto> {
  private unsubscribe = new Subject();

  @Inject(OptionGroupsApi) private readonly api!: OptionGroupsApi;
  @Inject(BusyOverlay) private readonly busy!: BusyOverlay;

  constructor() {
    super();
  }

  add(template: string) {
    const result = new TemplateParser().parse(template);
    if (!result) {
      return;
    }

    if (result.type === ParsedValueType.Object) {
      this.addNested(result.name);
    } else if (result.type !== undefined) {
      this.addProperty(result.name, result.value, result.type);
    }
  }

  addNested(name: string) {
    this.busy.showBusy();
    this.api.createOptionGroup(this.data.id, name);
  }

  addProperty(name: string, value: any, type: OptionValueType) {
    this.busy.showBusy();
    this.api.createOption(this.data.id, name, '', value, type);
  }

  async deleteProperty(name: string, id: string) {
    const res = await Modals.showConfirm('Delete property', `Are you sure you want to delete property [${name}] from group [${this.data.name}]?`);
    if (!res) {
      return;
    }
    this.busy.showBusy();
    this.api.deleteOption(id);
  }

  async deleteNested(name: string, id: string) {
    const res = await Modals.showConfirm('Delete property', `Are you sure you want to delete group [${name}]?`)
    if (!res) {
      return;
    }
    this.busy.showBusy();
    this.api.deleteOptionGroup(id);
  }

  changeGroupName(e: string) {
    this.busy.showBusy();
    this.backup();
    this.data.name = e;
    this.api.updateOptionGroup(this.data.id, e, this.data.description);
  }

  created() {
    this.api.onError.pipe(takeUntil(this.unsubscribe)).subscribe(() => this.rollback());

    this.api.optionGroupCreated.pipe(takeUntil(this.unsubscribe)).subscribe(x => {
      this.data.nestedGroups.push({
        id: x.id,
        name: x.name,
        description: x.description,
        nestedGroups: [],
        options: [],
        root: false
      });
      this.busy.hideBusy();
    });

    this.api.optionGroupUpdated.pipe(takeUntil(this.unsubscribe)).subscribe(x => {
      this.data.name = x.name;
      this.data.description = x.description;
      this.busy.hideBusy();
    });

    this.api.optionGroupDeleted.pipe(takeUntil(this.unsubscribe)).subscribe(x => {
      this.data.nestedGroups = this.data.nestedGroups.filter(f => f.id !== x.id);
      this.busy.hideBusy();
    });

    this.api.optionCreated.pipe(takeUntil(this.unsubscribe)).subscribe(x => {
      this.data.options.push({
        id: x.id,
        name: x.name,
        description: x.description,
        value: x.value,
        type: x.type
      });
      this.busy.hideBusy();
    });

    this.api.optionDeleted.pipe(takeUntil(this.unsubscribe)).subscribe(x => {
      this.data.options = this.data.options.filter(f => f.id !== x.id);
      this.busy.hideBusy();
    });
  }

  beforeDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
