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
import { App } from './App';
export default App
</script>

<style lang="scss">
@import "@/assets/variables.scss";
@import 'node_modules/bootstrap/scss/bootstrap.scss';
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
