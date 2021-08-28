<template>
  <div id="sidebar">
    <h3>Projects</h3>
    <div class="list-wrapper">
      <b-list-group v-if="projects">
        <template v-for="(project, pIndex) in projects">
          <div class="parent" :key="'parent' + pIndex">
            <b-list-group-item
              v-b-toggle
              class="parent-item"
              :href="'#proj' + pIndex"
              :key="'toggle' + pIndex">
              <b-row :key="'row' + pIndex">
                <b-col> <b-icon icon="folder"></b-icon> {{ project.name }} </b-col>
                <b-col class="delete-button-col">
                  <span
                    @click.stop="deleteProject(project)"
                    title="Delete project">
                    <b-icon icon="trash" aria-label="Delete project" />
                  </span>
                </b-col>
              </b-row>
            </b-list-group-item>

            <b-collapse
              :id="'proj' + pIndex"
              :key="'collapse' + pIndex"
              class="child-group">
              <b-list-group :key="'child-group' + pIndex">
                <b-list-group-item
                  href="#"
                  class="child-item"
                  v-for="(env, eIndex) in project.environments"
                  :key="pIndex + '-' + eIndex"
                  @click="$emit('selectEnv', env); selectProject(project)">
                  <div class="d-flex">
                    <div class="env-text">
                      ├─
                    </div>
                    <div class="env-icon">
                      <b-icon icon="file-earmark-code"></b-icon>
                    </div>
                    <div class="env-name">
                      {{ env.name }}
                    </div>
                    <div class="env-remove-button ml-auto">
                      <span
                        @click.stop="removeEnv(env)"
                        title="Remove environment">
                        <b-icon
                          icon="x"
                          aria-label="Remove environment" />
                      </span>
                    </div>
                  </div>
                </b-list-group-item>

                <b-list-group-item
                  href="#"
                  class="child-item"
                  :key="'addEnv' + pIndex">
                  <div class="d-flex">
                    <div class="add-env-text">
                      └─
                    </div>
                    <div class="add-env-icon">
                      <b-icon icon="file-earmark-plus" />
                    </div>
                    <div class="add-env-input">
                      <new-item
                        v-nospaces
                        max-length="12"
                        placeholder="new environment..."
                        :id="project.id"
                        @onCommit="addEnv(project, $event)">
                        <template v-slot:tooltip>Type new environment name</template>
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
                v-nospaces
                max-length="40"
                placeholder="new project..."
                id="new-proj"
                @onCommit="createProject($event)">
                <template v-slot:tooltip>Type new project name</template>
              </new-item>
            </div>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Sidebar } from './sidebar';
export default Sidebar;
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

  .add-env-icon,
  .env-icon {
    margin-left: 8px;
  }

  .add-env-input,
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
