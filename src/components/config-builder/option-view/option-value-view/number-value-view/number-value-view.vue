<template>

  <div class="d-inline-block">
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
  padding: 0 !important;
  height: 1em !important;
  min-width: 40px !important;
  margin-top: 1px;
  &:focus {
    box-shadow: none !important;
  }
}

</style>
