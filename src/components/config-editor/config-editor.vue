<template>
  <div class="editor-wrapper">
    <h5>Environment</h5>
    <option-group-view :data="data"></option-group-view>
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

.value-view-wrapper {
  .delete-option {
    display: none;
    cursor: pointer;
    margin-left: 20px;

    &:hover {
      color: red;
      font-weight: bold !important;
    }
  }

  &:hover {
    .delete-option {
      display: initial;
    }
  }
}
</style>
