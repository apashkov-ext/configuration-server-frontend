<template>

  <div>
    <b-select class="val-input" 
      v-model="value"
      :options="options"
      @input="change($event)">
    </b-select>
  </div>

</template>

<script lang="ts">
import { BooleanValueView } from './boolean-value-view';
export default BooleanValueView;
</script>

<style lang="scss">
.val-input {
  border: none !important;
  background-color:rgba(0, 0, 0, 0) !important;
  padding: 0 !important;
  height: 1em !important;
  margin-top: 1px;
  &:focus {
    box-shadow: none !important;
  }
}

</style>
