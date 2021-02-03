<template>
    <div id="sidebar">
      <h2>Projects</h2>
      <div class="list-wrapper">
        <b-list-group v-if="projects && projects.length">
          <template v-for="(item, pIndex) in projects">
            <div class="parent" :key="'parent' + pIndex">
              <b-list-group-item v-b-toggle class="parent-item"
              :href="'#proj' + pIndex" 
              :key="'toggle' + pIndex" 
              :disabled="disabled"
              @click.prevent 
              @click.stop="select(item.name, item.configurations.find(f => !f.environment.length))">            
                <b-row :key="'row' + pIndex">
                  <b-col>
                    <b-icon icon="folder"></b-icon> {{item.name}} 
                  </b-col>
                  <b-col class="delete-button-col">
                    <span @click.stop="deleteProject(item.name)" title="Delete project">
                      <b-icon icon="trash" aria-label="Delete project"></b-icon>
                    </span>
                  </b-col>
                </b-row>
              </b-list-group-item>

              <b-collapse :id="'proj' + pIndex" :key="'collapse' + pIndex" class="child-group">
              
                <b-list-group :key="'child-group' + pIndex">

                  <b-list-group-item href="#" class="child-item"
                    v-for="(cfg, cIndex) in item.configurations.filter(f => f.environment.length)"
                    :key="pIndex + '-' + cIndex"
                    :disabled="disabled"
                    @click="select(item.name, cfg)">
                      <div class="d-flex">
                        <div class="env-text">
                          ├─ 
                        </div>
                        <div class="env-icon">
                          <b-icon icon="file-earmark-code"></b-icon>
                        </div>
                        <div class="env-name">
                          {{cfg.environment}}
                        </div>
                        <div class="env-remove-button ml-auto">
                          <span @click.stop="removeConfig(item.name, cfg.environment)" title="Remove config">
                            <b-icon icon="x" aria-label="Delete project"></b-icon>
                          </span>
                        </div>
                      </div>
                  </b-list-group-item> 

                  <b-list-group-item href="#" class="child-item" :key="'addConfig' + pIndex">
                    <div class="d-flex">
                      <div class="add-config-text">
                        └─ 
                      </div>
                      <div class="add-config-icon">
                        <b-icon icon="file-earmark-plus"></b-icon>
                      </div>
                      <div class="add-config-input">
                        <new-item
                          max-length="12" 
                          placeholder="new config..." 
                          @onCommit="addConfig(item.name, $event)">
                        </new-item>
                      </div>
                    </div>
                  </b-list-group-item> 

                </b-list-group>

              </b-collapse>
            </div>
          </template>
          
          <b-list-group-item>
            <div class="d-flex justify-content-start">
              <div class="create-project-icon">
                <b-icon icon="folder-plus"></b-icon>
              </div>
              <div class="create-project-input">
                <new-item
                  max-length="40" 
                  placeholder="new project..." 
                  @onCommit="createProject($event)"></new-item>
              </div>
            </div>
          </b-list-group-item>
    
        </b-list-group>
      </div>
    </div>  
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import { Project } from "@/types/project";
import { Configuration } from "@/types/configuration";
import NewItem from "@/components/new-item.vue";

@Component({
  components: { NewItem }
})
export default class Sidebar extends Vue {
  @Prop() projects!: Project[];
  @Prop() disabled!: boolean;

  select(projName: string, cfg: Configuration) {
    this.$emit('onSelectConfig', { projectName: projName, configName: cfg.environment, data: cfg.data });
  }

  createProject(name: string) {
    this.$emit('onCreateProject', { projectName: name });
  }

  deleteProject(name: string) {
    this.$emit('onDeleteProject', { projectName: name });
  }

  addConfig(projName: string, cfgName: string) {
    this.$emit('onAddConfig', { projectName: projName, configName: cfgName });
  }

  removeConfig(projName: string, cfgName: string) {
    this.$emit('onRemoveConfig', { projectName: projName, configName: cfgName });
  }
}
</script>

<style lang="scss" scoped>

  #sidebar {
    min-height: 100%;
    height: 100%;
    font-size: 1em;
    line-height: 1.2em;
    padding: 20px 0 0 30px;

    h2 {
      margin-bottom: 20px;
    }

    .list-group-item {
      border: none;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      padding-left: 20px !important;
    }

    .delete-button-col {
      -ms-flex: 0 0 30px;
      flex: 0 0 30px;
      padding: 0;

      span {
        display: none;
      }
    }

    .env-remove-button {
      display: none;
      margin-right: 9px;
    }

    .child-item {
      padding: 0 10px 0 24px;

      &:hover .env-remove-button {
        display: block;
      }
    }

    .parent {
      margin-bottom: 10px;
    }

    .parent-item {
      &:hover .delete-button-col span {
        display: inline-block;  
      }
    }

    .add-config-icon,
    .env-icon {
      margin-left: 8px;
    }

    .add-config-input,
    .env-name {
      margin-left: 10px;
    }

    .child-group {
      margin-top: 6px;
    }

    .create-project-input {
      margin-left: 8px;
    }
  }
</style>
