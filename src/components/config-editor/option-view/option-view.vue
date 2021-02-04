<template>

  <div v-if="content">

    <string-value-view v-if="content.type === OptionValueType.String" class="code-tab"
      :content="content.value" 
      :name="content.name"
      @changeValue="changeValue($event)"></string-value-view>

    <number-value-view v-else-if="content.type === OptionValueType.Number" class="code-tab"
      :content="content.value" 
      :name="content.name"
      @changeValue="changeValue($event)"></number-value-view>

    <boolean-value-view v-else-if="content.type === OptionValueType.Boolean" class="code-tab" 
      :content="content.value" 
      :name="content.name"
      @changeValue="changeValue($event)"></boolean-value-view>
    
    <array-value-view v-else-if="content.type === OptionValueType.StringArray" 
      :content="content.value" 
      :name="content.name"
      :elementsType="'string'"
      @changeValue="changeValue($event)">
    </array-value-view>

    <array-value-view v-else-if="content.type === OptionValueType.NumberArray" 
      :content="content.value" 
      :name="content.name"
      :elementsType="'number'"
      @changeValue="changeValue($event)">
    </array-value-view>

</div>

</template>

<script lang="ts">
import { OptionView } from './option-view';
export default OptionView;
</script>

<style lang="scss">

</style>
