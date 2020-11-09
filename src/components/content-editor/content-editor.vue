<template>
  <div id="editor">
    <h2>Config: {{label}}</h2>
      <b-button-toolbar class="toolbar">
        <b-button-group size="sm" class="mr-1">
          <b-button @click="edit" :disabled="disabled || editorMode">Edit</b-button>
          <b-button @click="cancel" :disabled="disabled || !editorMode">Cancel</b-button>
        </b-button-group>

        <b-button-group size="sm" class="mr-1">
          <b-button @click="commit(temp)" :disabled="disabled || !editorMode">Commit</b-button>
        </b-button-group>
      </b-button-toolbar>
  

    <b-form-textarea class="form-control"
      v-if="!editorMode && !busy" 
      :value="data.content" 
      rows="32" 
      max-rows="32" 
      no-resize
      disabled>
    </b-form-textarea>
    <b-form-textarea 
      v-if="editorMode && !busy" 
      class="form-control" 
      v-model="temp" 
      rows="32" 
      max-rows="32" 
      no-resize
      @input="handleInput($event)"
      :disabled="disabled">
    </b-form-textarea>
  </div>
</template>

<script lang="ts">
import { ContentEditor } from './content-editor';
export default ContentEditor
</script>

<style lang="scss">
  #editor {
    min-height: 100%;
    height: 100%;
    padding: 20px 0 0 20px;

    textarea,
    textarea[disabled] {
      background-color: rgba(255, 255, 255, 0);
      border: none;

      &:focus {
        box-shadow: none;
      }
    }
    .toolbar {
      margin-top: 22px;
      button {
        box-shadow: none;
      }
    }
  }
</style>
