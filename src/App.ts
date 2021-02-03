import { Component, Vue } from 'vue-property-decorator';
import Sidebar from '@/components/sidebar/sidebar.vue';
import ContentEditor from '@/components/content-editor/content-editor.vue';
import ConfigBuilder from '@/components/config-builder/config-builder.vue';
import { Project, DataView } from '@/types';
import { AddConfigEvent, SelectConfigEvent, ProjectEvent, ChangeConfigEvent, RemoveConfigEvent } from '@/types/events';
import { Modals } from '@/components/modals';
import { Helper } from '@/helper';
import { PropInject } from 'di-corate';
import { ConfigsApi, ProjectsApi, Toastr } from './core/abstractions';

@Component({
  components: { Sidebar, ContentEditor, ConfigBuilder }
})
export class App extends Vue {
  @PropInject('ProjectsApi') private readonly projectsApi!: ProjectsApi;
  @PropInject('ConfigsApi') private readonly configsApi!: ConfigsApi;
  @PropInject('Toastr') private readonly toastr!: Toastr;
  private projects = new Array<Project>();
  private selected: DataView | null = null;

  private uiState = {
    sidebar: {
      disabled: false
    },
    editor: {
      disabled: false
    },
    global: {
      busy: false
    }
  };

  selectConfig(event: SelectConfigEvent) {
    this.selected = new DataView(event.projectName, event.configName, event.data);
  }

  async createProject(event: ProjectEvent) {
    if (this.projects.find(f => f.name === event.projectName)) {
      this.toastr.warn(`Project '${event.projectName}' already exists`);
      return;
    }

    this.uiState.global.busy = true;
    const proj = await this.projectsApi.createProject(event.projectName);
    this.projects.push(proj);
    this.uiState.global.busy = false;
    await Modals.showNotif(`Use this api key to access the project '${event.projectName}'`, Helper.hash(event.projectName));
    this.toastr.success(`Project '${event.projectName}' was successfully created`);
  }

  async deleteProject(event: ProjectEvent) {
    const confirm = await Modals.showConfirm('Delete project confirmation', `Are you sure you want to delete project '${event.projectName}'?`);
    if (!confirm) {
      return;
    }

    this.uiState.global.busy = true;
    await this.projectsApi.deleteProject(event.projectName);
    if (this.selected && this.selected.projectName === event.projectName) {
      this.selected = null;
    }
    this.projects = this.projects.filter(f => f.name !== event.projectName);
    this.uiState.global.busy = false;
    this.toastr.success(`Project '${event.projectName}' was successfully deleted`);
  }

  async addConfig(event: AddConfigEvent) {
    if (this.projects.filter(f => f.name === event.projectName && f.configurations.find(x => x.environment === event.configName)).length) {
      this.toastr.warn(`Configuration '${event.configName}' already exists in project '${event.projectName}'`);
      return;
    }

    this.uiState.global.busy = true;

    const config = await this.configsApi.addConfiguration(event.projectName, event.configName);

    const project = this.projects.find(f => f.name === event.projectName);
    if (!project) {
      await this.refreshProjectList();
      this.uiState.global.busy = false;
      return;
    }

    project.addConfig(config);

    this.uiState.global.busy = false;

    this.toastr.success(`Configuration '${event.configName}' was successfully added`);
  }
  
  async changeConfig(event: ChangeConfigEvent) {
    this.uiState.global.busy = true;

    await this.configsApi.updateConfiguration(event.projectName, event.configName, event.data);

    const proj = this.projects.find(f => f.name === event.projectName);
    if (!proj) {
      await this.refreshProjectList();
      this.uiState.global.busy = false;
      return;
    }

    const config = proj.configurations.find(f => f.environment === event.configName);
    if (!config) {
      await this.refreshProjectList();
      this.uiState.global.busy = false;
      return;
    }

    config.updateData(event.data);

    this.selected = new DataView(event.projectName, event.configName, event.data);

    this.uiState.global.busy = false;

    this.toastr.success(`Configuration '${event.configName}' was successfully updated`);
  }

  async removeConfig(event: RemoveConfigEvent) {
    const confirm = await Modals.showConfirm('Remove config confirmation', 
      `Are you sure you want to remove config '${event.configName}' from project '${event.projectName}'?`);
    if (!confirm) {
      return;
    }

    this.uiState.global.busy = true;
    const proj = this.projects.find(f => f.name === event.projectName);
    if (!proj) {
      await this.refreshProjectList();
      return;
    }

    const config = proj.configurations.find(f => f.environment === event.configName);
    if (!config) {
      return;
    }

    await this.configsApi.removeConfiguration(event.projectName, event.configName);
    if (this.selected && this.selected.projectName === event.projectName && this.selected.configName === event.configName) {
      this.selected = null;
    }
    proj.removeConfig(config);
    this.uiState.global.busy = false;
    this.toastr.success(`Configuration '${event.configName}' was successfully removed`);
  }

  private async refreshProjectList() {
    try {
      this.projects = await this.projectsApi.projects();
    } catch (e) {
      console.error("error", e);
    }
  }

  async mounted() {
    this.uiState.global.busy = true;
    await this.refreshProjectList();
    this.uiState.global.busy = false;
  }
}