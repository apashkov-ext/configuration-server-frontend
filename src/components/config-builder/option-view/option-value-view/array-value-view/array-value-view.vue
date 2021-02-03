<template>

  <div>
    <template v-for="(element, cIndex) in content">

      <string-value-view v-if="elementsType === 'string'" 
        :key="'str-elem-view' + cIndex"
        :content="element" 
        @change="changeElem($event, cIndex)">
      </string-value-view>

      <number-value-view v-else-if="elementsType === 'number'" 
        :key="'numb-elem-view' + cIndex"
        :content="element" 
        @change="changeElem($event, cIndex)">
      </number-value-view>

    </template>
  </div>

</template>

<script lang="ts">
import { ArrayValueView } from './array-value-view';
export default ArrayValueView;
</script>

<style lang="scss">

</style>
