<template>
  <div>
    <expandable-code-group
      :name="name"
      :tootip="description"
      openBracket="["
      closeBracket="]"
      @changeName="changeName($event)"
    >
      <template v-for="(element, cIndex) in value">
        <string-value-view
          v-if="elementsType === 'string'"
          class="arr-element"
          :key="'str-elem-view' + cIndex"
          :value="element"
          @changeValue="changeElem($event, cIndex)"
        >
        </string-value-view>

        <number-value-view
          v-else-if="elementsType === 'number'"
          class="arr-element"
          :key="'numb-elem-view' + cIndex"
          :value="element"
          @changeValue="changeElem($event, cIndex)"
        >
        </number-value-view>
      </template>

      <div class="add-prop-wrapper">
        <new-item
          v-if="elementsType === 'string'"
          class="add-prop"
          max-length="128"
          placeholder="add value..."
          @onCommit="addValue($event)"
        >
        </new-item>
        <new-item
          v-else-if="elementsType === 'number'"
          class="add-prop"
          max-length="128"
          v-digitsonly
          placeholder="add value..."
          @onCommit="addValue($event)"
        >
        </new-item>
      </div>
    </expandable-code-group>
  </div>
</template>

<script lang="ts">
import { ArrayValueView } from './array-value-view';
export default ArrayValueView;
</script>

<style lang="scss">
@import '@/assets/variables.scss';
.arr-element {
  input {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-left: $code-tab !important;
  }
}
</style>
