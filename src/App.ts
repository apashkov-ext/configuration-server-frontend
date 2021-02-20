import { Component, Vue } from 'vue-property-decorator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Sidebar from '@/components/sidebar/sidebar.vue';
import ConfigEditor from '@/components/config-editor/config-editor.vue';
import { Inject } from 'di-corate';
import { BusyOverlay } from './core/busy-overlay';
import { SelectEnvEvent } from './types/events/select-env-event';
import { EnvironmentDto } from './types/dto/environment-dto';
import { OptionGroupDto } from './types/dto/option-group-dto';

@Component({
  components: { Sidebar, ConfigEditor }
})
export class App extends Vue {
  private unsubscribe = new Subject();

  @Inject(BusyOverlay) readonly busyOverlay!: BusyOverlay;

  selectedOptionGroup: OptionGroupDto | null = null;
  isBusy = true;

  selectEnv(event: SelectEnvEvent) {
    this.selectedOptionGroup = event.env.optionGroup;
  }

  created() {
    this.busyOverlay.busyChanged
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(x => (this.isBusy = x));
  }

  beforeDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
