<template>
  <div class="d-flex align-items-stretch value-view-wrapper">
    <editable-label
      v-if="name"
      :value="name"
      :tooltip="description"
      @change="$emit('changeName', $event)">
    </editable-label>

    <div class="opt-value">
      <b-select
        class="val-input"
        v-model="isTrue"
        :options="options"
        @input="$emit('changeValue', $event)">
      </b-select>
    </div>

    <span @click.stop="$emit('delete')"
      title="Delete option"
      class="delete-item">
      <b-icon icon="x" aria-label="Delete option"></b-icon>
    </span>
  </div>
</template>

<script lang="ts">
import { BooleanValueView } from './boolean-value-view';
export default BooleanValueView;
</script>

<style lang="scss"></style>
