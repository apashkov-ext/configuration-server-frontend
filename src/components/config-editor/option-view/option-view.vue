<template>
  <div>
    <string-value-view
      v-if="data.type === OptionValueType.String"
      class="code-tab"
      :value="data.value"
      :name="data.name"
      :description="data.description"
      @changeValue="changeValue($event)"
      @changeName="changeName($event)"
      @delete="$emit('delete')" />

    <number-value-view
      v-if="data.type === OptionValueType.Number"
      class="code-tab"
      :value="data.value"
      :name="data.name"
      :description="data.description"
      @changeValue="changeValue($event)"
      @changeName="changeName($event)"
      @delete="$emit('delete')" />

    <boolean-value-view
      v-if="data.type === OptionValueType.Boolean"
      class="code-tab"
      :value="data.value"
      :name="data.name"
      :description="data.description"
      @changeValue="changeValue($event)"
      @changeName="changeName($event)"
      @delete="$emit('delete')" />

    <array-value-view
      v-if="data.type === OptionValueType.StringArray"
      :id="data.id"
      :value="data.value"
      :name="data.name"
      :description="data.description"
      elementsType="string"
      @changeValue="changeValue($event)"
      @changeName="changeName($event)"
      @delete="$emit('delete')" />

    <array-value-view
      v-if="data.type === OptionValueType.NumberArray"
      :id="data.id"
      :value="data.value"
      :name="data.name"
      :description="data.description"
      elementsType="number"
      @changeValue="changeValue($event)"
      @changeName="changeName($event)"
      @delete="$emit('delete')" />
  </div>
</template>

<script lang="ts">
import { OptionView } from './option-view';
export default OptionView;
</script>

<style lang="scss"></style>
