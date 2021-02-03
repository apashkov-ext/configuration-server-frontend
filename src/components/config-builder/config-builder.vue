<template>
  <b-container>

    <option-group-view :content="testContent"></option-group-view>


  </b-container>
</template>

<script lang="ts">
import { ConfigBuilder } from './config-builder';
export default ConfigBuilder;
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
