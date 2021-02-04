<template>

  <div>
    <span>{{name}}: [</span>
    <div>
      <template v-for="(element, cIndex) in content">

        <string-value-view v-if="elementsType === 'string'" class="arr-element"
          :key="'str-elem-view' + cIndex"
          :content="element" 
          @change="changeElem($event, cIndex)">
        </string-value-view>

        <number-value-view v-else-if="elementsType === 'number'" class="arr-element"
          :key="'numb-elem-view' + cIndex"
          :content="element" 
          @change="changeElem($event, cIndex)">
        </number-value-view>

      </template>
    </div>
  </div>

</template>

<script lang="ts">
import { ArrayValueView } from './array-value-view';
export default ArrayValueView;
</script>

<style lang="scss">
  .arr-element {
    input {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }
  }
</style>
