<template>
  <div class="d-flex align-items-stretch value-view-wrapper">
    <editable-label
      v-if="name"
      :value="name"
      :tooltip="description"
      @change="$emit('changeName', $event)">
    </editable-label>

    <div class="opt-value">
      <b-input
        class="val-input"
        v-autowidth="{ maxWidth: '400px', minWidth: '20px', comfortZone: 0 }"
        v-quotes
        v-model="temp.value"
        @click="edit()"
        @keydown.native.enter="commit(temp.value)"
        @keydown.native.esc="cancel()"
        @blur="cancel()"
        ref="valueInput">
      </b-input>
    </div>

    <span
      @click.stop="$emit('delete')"
      title="Delete option"
      class="delete-item">
      <b-icon icon="x" aria-label="Delete option"></b-icon>
    </span>
  </div>
</template>

<script lang="ts">
import { StringValueView } from './string-value-view';
export default StringValueView;
</script>

<style lang="scss"></style>
