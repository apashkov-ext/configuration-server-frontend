<template>
  <div v-if="environment" class="editor-wrapper">
    <h5>{{environment.name}}</h5>
    <b-tabs>

      <b-tab title="Preview" active>
        <config-preview :data="preview" />
      </b-tab>

      <b-tab title="Edit">
        <option-group-view :data="environment.optionGroup" @update="$emit('imported')" />
      </b-tab>

      <template #tabs-end>
        <b-link @click="download()">Download</b-link>
        <b-link @click="$refs.fileInput.click()">Import</b-link>
      </template>

    </b-tabs>

    <input type="file" ref="fileInput" style="display: none" @change="uploadFile($event.target.files)" 
      accept="application/json,text/plain,.json,.txt" />
  </div>
</template>

<script lang="ts">
import { ConfigEditor } from './config-editor';
export default ConfigEditor;
</script>

<style lang="scss">
.opt-value {
  height: 24px;
}

.opt-name {
  margin-right: 10px;
}

.editor-wrapper {
  padding: 30px 10px 10px 20px;
}

.val-input {
  border: none !important;
  background-color: rgba(0, 0, 0, 0) !important;
  background-image: none !important;
  padding: 0 !important;
  margin-left: 10px;

  &:hover,
  &:focus {
    font-weight: bold !important;
  }

  &:focus {
    box-shadow: none !important;
  }

  height: 26px !important;
}

.code-grp-tgl,
.value-view-wrapper {
  .delete-item {
    display: none;
    cursor: pointer;
    margin-left: 20px;

    &:hover {
      color: red;
      font-weight: bold !important;
    }
  }

  &:hover {
    .delete-item {
      display: initial;
    }
  }
}
</style>
