<template>

  <div class="d-flex align-items-stretch">

    <div v-if="name" class='opt-name'>{{name}}:</div>

    <div class="opt-value">
      <b-select class="bool-val-input" 
        v-model="value"
        :options="options"
        @input="change($event)">
      </b-select>
    </div>

  </div>

</template>

<script lang="ts">
import { BooleanValueView } from './boolean-value-view';
export default BooleanValueView;
</script>

<style lang="scss">
.opt-value {
  height: 24px;
}
.opt-name {
  margin-right: 10px;
}
.bool-val-input {
  border: none !important;
  background-color:rgba(0, 0, 0, 0) !important;
  background-image: none !important;
  padding: 0 !important;
  height: 26px !important;
  &:focus {
    box-shadow: none !important;
  }
}

</style>
