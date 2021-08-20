<template>
  <div>
    <expandable-code-group
      :name="name"
      :tooltip="description"
      deletable="true"
      brackets="[]"
      @changeName="$emit('changeName', $event)"
      @delete="$emit('delete')">
      <template v-for="(element, cIndex) in value">
        <string-value-view
          v-if="elementsType === 'string'"
          class="arr-element"
          :key="'str-elem-view' + cIndex"
          :value="element"
          @changeValue="changeElem($event, cIndex)"
          @delete="removeElem(element, cIndex)">
        </string-value-view>

        <number-value-view
          v-else-if="elementsType === 'number'"
          class="arr-element"
          :key="'numb-elem-view' + cIndex"
          :value="element"
          @changeValue="changeElem($event, cIndex)"
          @delete="removeElem(element, cIndex)">
        </number-value-view>
      </template>

      <div class="add-prop-wrapper">
        <new-item
          :id="id"
          v-if="elementsType === 'string'"
          class="add-prop"
          max-length="128"
          placeholder="add value..."
          @onCommit="addValue($event)">
          <template v-slot:tooltip>Type any string value</template>
        </new-item>
        <new-item
          :id="id"
          v-else-if="elementsType === 'number'"
          class="add-prop"
          max-length="10"
          v-digitsonly
          placeholder="add value..."
          @onCommit="addValue($event)">
          <template v-slot:tooltip>Type number value</template>
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
