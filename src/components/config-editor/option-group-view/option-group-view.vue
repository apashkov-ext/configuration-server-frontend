<template>
  <div v-if="content">

    <expandable-code-group 
      :name="content.name" 
      openBracket="{" 
      closeBracket="}" 
      @changePropName="changeGroupName($event)">

      <template v-for="(option, oIndex) in content.options">
        <option-view
          :key="'option' + oIndex" 
          :content="option">
        </option-view>
      </template>

      <template v-for="(nested, nIndex) in content.nestedGroups">
        <option-group-view :key="'nested' + nIndex" :content="nested"></option-group-view>
      </template>

      <div class="add-prop-wrapper">
        <new-item class="add-prop" max-length="128" placeholder="add property..." @onCommit="add($event)" ></new-item>
      </div>
      
    </expandable-code-group>
  </div>
</template>

<script lang="ts">
import { OptionGroupView } from './option-group-view';
export default OptionGroupView;
</script>

<style lang="scss">
@import '@/assets/variables.scss';

  .add-prop-wrapper {
    padding-top: 8px;

    .add-prop {
      margin-left: $code-tab; 
    }
  }

</style>
