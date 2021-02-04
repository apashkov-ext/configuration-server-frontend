<template>

  <div class="d-flex align-items-stretch">

    <div v-if="name" class='opt-name'>{{name}}:</div>

    <div class="opt-value">
      <b-select class="val-input" 
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

</style>
