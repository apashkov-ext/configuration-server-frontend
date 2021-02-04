<template>

  <div>
    <span v-if="name">{{name}}: </span>
      <b-input class="string-val-input" 
        type="text"
        v-quotes
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
import { StringValueView } from './string-value-view';
export default StringValueView;
</script>

<style lang="scss">
.string-val-input {
  border: none !important;
  background-color:rgba(0, 0, 0, 0) !important;
  &:focus {
    box-shadow: none !important;
  }
}

</style>
