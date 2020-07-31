<template>
<b-overlay :show="uiState.global.busy" rounded="sm">
  <b-container fluid class="main-wrapper">
    
      <b-row>
      <b-col class="sidebar-col" align-self="stretch">
        <sidebar 
          :projects="projects"
          :disabled="uiState.sidebar.disabled"
          @onSelectConfig="selectConfig($event)"
          @onCreateProject="createProject($event)"
          @onDeleteProject="deleteProject($event)"
          @onAddConfig="addConfig($event)"
          @onRemoveConfig="removeConfig($event)">
        </sidebar>
      </b-col>
      <b-col class="editor-col" align-self="stretch">
        <content-editor 
          v-if="selected"
          :data="selected" 
          :disabled="uiState.editor.disabled"
          @onChange="changeConfig($event)">
        </content-editor>
      </b-col>
    </b-row>
    
  </b-container>
  </b-overlay>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Sidebar from "@/components/sidebar/sidebar.vue";
import ContentEditor from "@/components/content-editor/content-editor.vue";
import { Configuration } from '@/types/configuration';
import { DataView } from '@/types/data-view';
import { AddConfigEvent } from '@/types/events/add-config-event';
import { Project } from '@/types/project';
import { SelectConfigEvent } from '@/types/events/select-config-event';
import { ProjectEvent } from '@/types/events/project-event';
import { ChangeConfigEvent } from '@/types/events/change-config-event';
import { RemoveConfigEvent } from '@/types/events/remove-config-event';
import { Modals } from '@/components/modals';
import { ProjectsApi } from '@/api/projects-api';
import { ConfigsApi } from '@/api/configs-api';
import Helper from '@/helper';

@Component({
  components: { Sidebar, ContentEditor}
})
export default class App extends Vue {
  private projectsApi = new ProjectsApi();
  private configsApi = new ConfigsApi();
  private projects: Project[] = [];
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

  private selectConfig(event: SelectConfigEvent) {
    this.selected = new DataView(event.projectName, event.configName, event.data);
  }

  private async createProject(event: ProjectEvent) {
    if (this.projects.find(f => f.name === event.projectName)) {
      this.toastWarn(`Project '${event.projectName}' already exists`);
      return;
    }

    this.uiState.global.busy = true;
    const proj = await this.projectsApi.createProject(event.projectName);
    this.projects.push(proj);
    this.uiState.global.busy = false;
    await Modals.showNotif(`Use this api key to access the project '${event.projectName}'`, Helper.hash(event.projectName));
    this.toastSuccess(`Project '${event.projectName}' was successfully created`);
  }

  private async deleteProject(event: ProjectEvent) {
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
    this.toastSuccess(`Project '${event.projectName}' was successfully deleted`);
  }

  private async addConfig(event: AddConfigEvent) {
    if (this.projects.filter(f => f.name === event.projectName && f.configurations.find(x => x.environment === event.configName)).length) {
      this.toastWarn(`Configuration '${event.configName}' already exists in project '${event.projectName}'`);
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

    this.toastSuccess(`Configuration '${event.configName}' was successfully added`);
  }
  
  private async changeConfig(event: ChangeConfigEvent) {
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

    this.toastSuccess(`Configuration '${event.configName}' was successfully updated`);
  }

  private async removeConfig(event: RemoveConfigEvent) {
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
    this.toastSuccess(`Configuration '${event.configName}' was successfully removed`);
  }

  private async refreshProjectList() {
    try {
      this.projects = await this.projectsApi.projects();
    } catch (e) {
      console.error("error", e);
    }
  }

  private toastSuccess(text: string) {
    this.$bvToast.toast(text, {
      title: 'Success',
      solid: false,
      appendToast: true,
      toaster: 'b-toaster-bottom-right',
      variant: 'success'
    });
  }

  private toastWarn(text: string) {
    this.$bvToast.toast(text, {
      title: 'Note',
      solid: false,
      appendToast: true,
      toaster: 'b-toaster-bottom-right',
      variant: 'warning'
    });
  }

  async mounted() {
    this.uiState.global.busy = true;
    await this.refreshProjectList();
    this.uiState.global.busy = false;
  }
}
</script>

<style lang="scss">
@import "@/assets/variables.scss";
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';

html, body{
  height: 100%;
  font-family: Consolas, monaco, monospace;
}

.main-wrapper {
  height: 100vh;

  .row {
    height: 100%;
  }
}

.sidebar-col {
  -ms-flex: 0 0 300px;
  flex: 0 0 300px;
  border-right: 1px solid black;
  padding: 0 !important;
}

.editor-col {
  padding: 0 !important;
}

</style>
