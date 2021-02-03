<template>
  <div v-if="content">

    <span>{{content.name}}: </span>
    <option-value-view :value="content.value" 
      :type="content.type" 
      @change="changeOptionValue($event)">
    </option-value-view>

  </div>
</template>

<script lang="ts">
import { OptionView } from './option-view';
export default OptionView;
</script>

<style lang="scss">

</style>
