<template>
  <div v-if="data">
    <string-value-view
      v-if="data.type === OptionValueType.String"
      class="code-tab"
      :value="data.value"
      :name="data.name"
      :description="data.description"
      @changeValue="changeValue($event)"
      @changeName="changeName($event)"
      @delete="$emit('delete', data.name)">
    </string-value-view>

    <number-value-view
      v-if="data.type === OptionValueType.Number"
      class="code-tab"
      :value="data.value"
      :name="data.name"
      :description="data.description"
      @changeValue="changeValue($event)"
      @changeName="changeName($event)"
      @delete="$emit('delete', data.name)">
    </number-value-view>

    <boolean-value-view
      v-if="data.type === OptionValueType.Boolean"
      class="code-tab"
      :value="data.value"
      :name="data.name"
      :description="data.description"
      @changeValue="changeValue($event)"
      @changeName="changeName($event)"
      @delete="$emit('delete', data.name)">
    </boolean-value-view>

    <array-value-view
      v-if="data.type === OptionValueType.StringArray"
      :value="data.value"
      :name="data.name"
      :description="data.description"
      elementsType="string"
      @changeValue="changeValue($event)"
      @changeName="changeName($event)"
      @delete="$emit('delete', data.name)">
    </array-value-view>

    <array-value-view
      v-if="data.type === OptionValueType.NumberArray"
      :value="data.value"
      :name="data.name"
      :description="data.description"
      elementsType="number"
      @changeValue="changeValue($event)"
      @changeName="changeName($event)"
      @delete="$emit('delete', data.name)">
    </array-value-view>
  </div>
</template>

<script lang="ts">
import { OptionView } from './option-view';
export default OptionView;
</script>

<style lang="scss"></style>
