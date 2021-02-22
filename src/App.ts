import { Component, Vue } from 'vue-property-decorator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Sidebar from '@/components/sidebar/sidebar.vue';
import ConfigEditor from '@/components/config-editor/config-editor.vue';
import { Inject } from 'di-corate';
import { BusyOverlay } from './core/busy-overlay';
import { EnvironmentDto } from './types/dto/environment-dto';

@Component({
  components: { Sidebar, ConfigEditor }
})
export class App extends Vue {
  private unsubscribe = new Subject();

  @Inject(BusyOverlay) readonly busyOverlay!: BusyOverlay;

  selectedEnv: EnvironmentDto | null = null;
  isBusy = true;

  selectEnv(event: EnvironmentDto) {
    this.selectedEnv = event;
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
