<template>
  <div class="d-flex align-items-stretch value-view-wrapper">

    <editable-label v-if="name" :value="name" :tooltip="description" @change="changeName($event)"></editable-label>

    <div class="opt-value">
      <b-select class="val-input" 
        v-model="isTrue"
        :options="options"
        @input="changeValue($event)">
      </b-select>
    </div>

    <span @click.stop="deleteOption(env)" title="Delete option" class="delete-option">
      <b-icon icon="x" aria-label="Delete option"></b-icon>
    </span>

  </div>
</template>

<script lang="ts">
import { BooleanValueView } from './boolean-value-view';
export default BooleanValueView;
</script>

<style lang="scss">

</style>
