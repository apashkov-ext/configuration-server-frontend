<template>
  <div class="d-inline" @dblclick="edit()" v-b-tooltip.hover="tooltip || ''">
    <b-input
      v-autowidth="{ maxWidth: '400px', minWidth: '20px', comfortZone: 0 }"
      type="text"
      class="label-input"
      v-model="temp"
      :disabled="!editorMode"
      @keydown.native.enter="commit(temp)"
      @keydown.native.esc="cancel()"
      @blur="cancel()"
      ref="valueInput"
    >
    </b-input>

    <span>: </span>
  </div>
</template>

<script lang="ts">
import { EditableLabel } from './editable-label';
export default EditableLabel;
</script>

<style lang="scss">
@import '@/assets/variables.scss';

.label-input {
  border: none !important;
  background-color: rgba(0, 0, 0, 0) !important;
  background-image: none !important;
  padding: 0 !important;
  display: inline-block !important;

  &:hover {
    cursor: pointer !important;
    color: $prop-name-hover-color !important;
  }

  &:focus {
    font-weight: bold !important;
    box-shadow: none !important;
    cursor: text !important;
    color: $prop-name-hover-color !important;
  }

  height: 26px !important;
}
</style>
