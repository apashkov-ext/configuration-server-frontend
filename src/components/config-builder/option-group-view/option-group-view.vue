<template>
  <div v-if="content">

    <div>
      <b-badge class="expand-contract" variant="light" v-if="expanded" @click="expanded = !expanded">-</b-badge>
      <b-badge class="expand-contract" variant="light" v-else @click="expanded = !expanded">+</b-badge>
      <span v-if="content.name" class="prop-name">{{content.name}} </span><span v-if="expanded">{</span><span v-else>{...}</span>  
    </div> 

    <div v-show="expanded" >
      <div class="content code-group">

        <template v-for="(option, oIndex) in content.options">
          <option-view class="code-tab" 
            :key="'option' + oIndex" 
            :content="option">
          </option-view>
        </template>

        <template v-for="(nested, nIndex) in content.nestedGroups">
          <option-group-view :key="'nested' + nIndex" :content="nested"></option-group-view>
        </template>

      </div>
    </div>

    <div v-if="expanded" class="add-prop-wrapper">
      <new-item class="add-prop" max-length="128" placeholder="add property..." @onCommit="addProperty($event)" ></new-item>
    </div>

    <div>
      <span class="code-tab" v-if="expanded">}</span>
    </div>

  </div>
</template>

<script lang="ts">
import { OptionGroupView } from './option-group-view';
export default OptionGroupView;
</script>

<style lang="scss">
@import '@/assets/variables.scss';
  .expand-contract {
    margin-right: 8px;
    cursor: pointer;

    :hover {
      background-color: $hovercolor;
    }
  }

  .code-group {
    padding-left: 27px;
  }

  .add-prop-wrapper {
    padding-top: 8px;

    .add-prop {
      margin-left: 52px; 
    }
  }

  .code-tab {
    margin-left: 24px;
  }
</style>
