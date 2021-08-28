import { Component, Vue } from 'vue-property-decorator';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import Sidebar from '@/components/sidebar/sidebar.vue';
import ConfigEditor from '@/components/config-editor/config-editor.vue';
import { Inject } from 'di-corate';
import { BusyOverlay } from './core/busy-overlay';
import { Environment } from './domain';
import { Toastr } from './core/toastr';
import { OptionGroupsApi } from './components/config-editor/option-group-view/option-group-api';
import { DtoParser } from './components/sidebar/dto-parser';

@Component({
  components: { Sidebar, ConfigEditor }
})
export class App extends Vue {
  private unsubscribe = new Subject();

  @Inject(BusyOverlay) readonly busy!: BusyOverlay;
  @Inject(Toastr) private readonly toastr!: Toastr;
  @Inject(OptionGroupsApi) private readonly optionGroupsApi!: OptionGroupsApi;

  selected: Environment | null = null;
  isBusy = true;

  selectEnv(event: Environment) {
    this.selected = event;
  }

  imported(optionGroupId: string) {
    this.optionGroupsApi.loadOptionGroup(optionGroupId);
  }

  created() {
    this.busy.busyChanged
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(x => (this.isBusy = x));

    this.optionGroupsApi.loaded
      .pipe(map(DtoParser.toOptionGroup))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(x => {
        if (this.selected) {
          this.selected.updateOptionGroup(x);
        }
        
        this.toastr.success('Configuration imported successfully');
        this.busy.hideBusy();
      });
  }

  beforeDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
