<template>

  <div v-if="content">

    <string-value-view v-if="content.type === OptionValueType.String" 
      :content="content.value" 
      :name="content.name"
      @change="changeValue($event)"></string-value-view>

    <number-value-view v-else-if="content.type === OptionValueType.Number" 
      :content="content.value" 
      :name="content.name"
      @change="changeValue($event)"></number-value-view>

    <boolean-value-view v-else-if="content.type === OptionValueType.Boolean" 
      :content="content.value" 
      :name="content.name"
      @change="changeValue($event)"></boolean-value-view>
    
    <array-value-view v-else-if="content.type === OptionValueType.StringArray" 
      :content="content.value" 
      :name="content.name"
      :elementsType="'string'"
      @change="changeValue($event)">
    </array-value-view>

    <array-value-view v-else-if="content.type === OptionValueType.NumberArray" 
      :content="content.value" 
      :name="content.name"
      :elementsType="'number'"
      @change="changeValue($event)">
    </array-value-view>

</div>

</template>

<script lang="ts">
import { OptionView } from './option-view';
export default OptionView;
</script>

<style lang="scss">

</style>
