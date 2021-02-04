<template>

  <div class="d-flex">
    <span v-if="name">{{name}}: </span>
    <b-input class="number-val-input" 
      v-digitsonly
      v-model="temp"
      @click="edit()"
      @keydown.native.enter="commit(temp)"
      @keydown.native.esc="cancel()"
      @blur="commit(temp)"
      ref="valueInput">
  </b-input>
  </div>

</template>

<script lang="ts">
import { NumberValueView } from './number-value-view';
export default NumberValueView;
</script>

<style lang="scss">
.number-val-input {
  border: none !important;
  background-color:rgba(0, 0, 0, 0) !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  &:focus {
    box-shadow: none !important;
  }
}

</style>
