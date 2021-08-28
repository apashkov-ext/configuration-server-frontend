import { Component } from 'vue-property-decorator';
import OptionView from '../option-view/option-view.vue';
import NewItem from '@/components/new-item.vue';
import ExpandableCodeGroup from '../expandable-code-group/expandable-code-group.vue';
import { Inject } from 'di-corate';
import { OptionGroupsApi } from './option-group-api';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { BusyOverlay } from '@/core/busy-overlay';
import { TemplateParser } from './template-parsing/template-parser';
import { ComponentWithData } from '@/core/component-with-data';
import { ParsedValueType } from './template-parsing/template';
import { Modals } from '@/core/modals';
import { OptionGroup, OptionValueType } from '@/domain';
import { DtoParser } from '@/components/sidebar/dto-parser';
import { OptionsApi } from '../option-view/options-api';

@Component({
  components: { OptionView, NewItem, ExpandableCodeGroup },
  name: 'option-group-view'
})
export class OptionGroupView extends ComponentWithData<OptionGroup> {
  private unsubscribe = new Subject();

  @Inject(OptionGroupsApi) private readonly optionGroupsApi!: OptionGroupsApi;
  @Inject(OptionsApi) private readonly optionsApi!: OptionsApi;
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
    this.optionGroupsApi.create(this.data.id, name);
  }

  addProperty(name: string, value: any, type: OptionValueType) {
    this.busy.showBusy();
    this.optionsApi.create(this.data.id, name, '', value, type);
  }

  deleteOption(id: string) {
    const o = this.data.options.find(f => f.id === id);
    Modals.showConfirm('Delete property', `Are you sure you want to delete the '${o?.name}' property from the '${this.data.name}' option group?`)
      .subscribe(res => {
        if (!res) {
          return;
        }
        this.busy.showBusy();
        this.optionsApi.delete(id);
      });
  }

  deleteNested(name: string, id: string) {
    Modals.showConfirm('Delete property', `Are you sure you want to delete '${name}' option group?`)
      .subscribe(res => {
        if (!res) {
          return;
        }
        this.busy.showBusy();
        this.optionGroupsApi.delete(id);
      });
  }

  changeGroupName(e: string) {
    this.busy.showBusy();
    this.backup();
    this.data.updateName(e);
    this.optionGroupsApi.update(this.data.id, e, this.data.description);
  }

  created() {
    this.optionGroupsApi.onError.pipe(takeUntil(this.unsubscribe)).subscribe(() => this.rollback());
    this.optionsApi.onError.pipe(takeUntil(this.unsubscribe)).subscribe(() => this.rollback());

    this.optionGroupsApi.created
      .pipe(map(DtoParser.toOptionGroup))
      .pipe(takeUntil(this.unsubscribe)).subscribe(x => {
      this.data.addNestedGroup(x);
      this.busy.hideBusy();
    });

    this.optionGroupsApi.updated.pipe(takeUntil(this.unsubscribe)).subscribe(x => {
      this.busy.hideBusy();
    });

    this.optionGroupsApi.deleted.pipe(takeUntil(this.unsubscribe)).subscribe(x => {
      const removedGroup = this.data.nestedGroups.find(f => f.id === x.id);
      if (removedGroup) {
        this.data.removeNestedGroup(removedGroup);
      }
      this.busy.hideBusy();
    });

    this.optionsApi.created
      .pipe(map(DtoParser.toOption))
      .pipe(takeUntil(this.unsubscribe)).subscribe(x => {
      this.data.addOption(x);
      this.busy.hideBusy();
    });

    this.optionsApi.optionDeleted.pipe(takeUntil(this.unsubscribe)).subscribe(x => {
      const removedOption = this.data.options.find(f => f.id === x.id);
      if (removedOption) {
        this.data.removeOption(removedOption);
      }
      this.busy.hideBusy();
    });
  }

  beforeDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
