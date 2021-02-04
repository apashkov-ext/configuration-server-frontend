<template>

  <div class="d-flex align-items-stretch">

    <div v-if="name" class='opt-name'>{{name}}:</div>

    <div class="opt-value">
      <b-input class="val-input" 
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

  </div>

</template>

<script lang="ts">
import { StringValueView } from './string-value-view';
export default StringValueView;
</script>

<style lang="scss">

</style>
