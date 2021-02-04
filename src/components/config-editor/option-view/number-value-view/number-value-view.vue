<template>

<div class="d-flex align-items-stretch">

    <div v-if="name" class='opt-name'>{{name}}:</div>

    <div class="opt-value">
      <b-input class="val-input" 
        v-digitsonly
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
import { NumberValueView } from "./number-value-view";
export default NumberValueView;
</script>

<style lang="scss">
</style>
