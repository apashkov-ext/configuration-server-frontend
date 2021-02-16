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

  // async createProject(event: ProjectEvent) {
  //   if (this.projects.find(f => f.name === event.projectName)) {
  //     this.toastr.warn(`Project '${event.projectName}' already exists`);
  //     return;
  //   }

  //   this.busyOverlay.showBusy();
  //   const proj = await this.projectsApi.createProject(event.projectName);
  //   this.projects.push(proj);
  //   this.busyOverlay.hideBusy();
  //   await Modals.showNotif(`Use this api key to access the project '${event.projectName}'`, Helper.hash(event.projectName));
  //   this.toastr.success(`Project '${event.projectName}' was successfully created`);
  // }

  // async deleteProject(event: ProjectEvent) {
  //   const confirm = await Modals.showConfirm('Delete project confirmation', `Are you sure you want to delete project '${event.projectName}'?`);
  //   if (!confirm) {
  //     return;
  //   }

  //   this.busyOverlay.showBusy();
  //   await this.projectsApi.deleteProject(event.projectName);
  //   if (this.selected && this.selected.projectName === event.projectName) {
  //     this.selected = null;
  //   }
  //   this.projects = this.projects.filter(f => f.name !== event.projectName);
  //   this.busyOverlay.hideBusy();
  //   this.toastr.success(`Project '${event.projectName}' was successfully deleted`);
  // }

  // async addConfig(event: AddConfigEvent) {
  //   if (this.projects.filter(f => f.name === event.projectName && f.configurations.find(x => x.environment === event.configName)).length) {
  //     this.toastr.warn(`Configuration '${event.configName}' already exists in project '${event.projectName}'`);
  //     return;
  //   }

  //   this.busyOverlay.showBusy();

  //   const config = await this.configsApi.addConfiguration(event.projectName, event.configName);

  //   const project = this.projects.find(f => f.name === event.projectName);
  //   if (!project) {
  //     await this.refreshProjectList();
  //     this.busyOverlay.hideBusy();
  //     return;
  //   }

  //   project.addConfig(config);

  //   this.busyOverlay.hideBusy();

  //   this.toastr.success(`Configuration '${event.configName}' was successfully added`);
  // }

  // async removeConfig(event: RemoveConfigEvent) {
  //   const confirm = await Modals.showConfirm('Remove config confirmation',
  //     `Are you sure you want to remove config '${event.configName}' from project '${event.projectName}'?`);
  //   if (!confirm) {
  //     return;
  //   }

  //   this.busyOverlay.showBusy();
  //   const proj = this.projects.find(f => f.name === event.projectName);
  //   if (!proj) {
  //     await this.refreshProjectList();
  //     return;
  //   }

  //   const config = proj.configurations.find(f => f.environment === event.configName);
  //   if (!config) {
  //     return;
  //   }

  //   await this.configsApi.removeConfiguration(event.projectName, event.configName);
  //   if (this.selected && this.selected.projectName === event.projectName && this.selected.configName === event.configName) {
  //     this.selected = null;
  //   }
  //   proj.removeConfig(config);
  //   this.busyOverlay.hideBusy();
  //   this.toastr.success(`Configuration '${event.configName}' was successfully removed`);
  // }

  // private async refreshProjectList() {
  //   this.busyOverlay.showBusy();
  //   this.projects = await this.projectsApi.projects();
  // }

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
