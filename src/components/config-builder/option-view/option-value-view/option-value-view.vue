<template>

  <div class="d-inline-block" v-if="value !== undefined && type !== undefined">

    <string-value-view v-if="type === OptionValueType.String" :content="value" @change="changeValue($event)"></string-value-view>
    <number-value-view v-else-if="type === OptionValueType.Number" :content="value" @change="changeValue($event)"></number-value-view>
    <boolean-value-view v-else-if="type === OptionValueType.Boolean" :content="value" @change="changeValue($event)"></boolean-value-view>
    
    <array-value-view v-else-if="type === OptionValueType.StringArray" 
      :content="value" 
      :elementsType="'string'"
      @change="changeValue($event)">
    </array-value-view>

    <array-value-view v-else-if="type === OptionValueType.NumberArray" 
      :content="number" 
      :elementsType="'string'"
      @change="changeValue($event)">
    </array-value-view>

  </div>

</template>

<script lang="ts">
import { OptionValueView } from './option-value-view';
export default OptionValueView;
</script>

<style lang="scss">

</style>
