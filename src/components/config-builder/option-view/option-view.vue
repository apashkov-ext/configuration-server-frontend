<template>
  <div v-if="content">

    <span>{{content.name}}: {{content.value}}</span>

  </div>
</template>

<script lang="ts">
import { OptionView } from './option-view';
export default OptionView;
</script>

<style lang="scss">
@import '@/assets/variables.scss';

</style>
