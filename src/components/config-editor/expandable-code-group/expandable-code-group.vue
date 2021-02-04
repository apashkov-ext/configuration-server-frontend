<template>
  <div>

    <div>
      <b-badge class="expand-contract" variant="light" v-if="expanded" @click="expanded = !expanded">-</b-badge>
      <b-badge class="expand-contract" variant="light" v-else @click="expanded = !expanded">+</b-badge>
      <span v-if="name" class="prop-name">{{name}} </span>
      <span v-if="expanded" class="contracted-view ">{{openBracket}}</span>
      <span v-else class="expanded-view" @click="expanded = !expanded">{{openBracket}}...{{closeBracket}}</span>  
    </div> 

    <div v-show="expanded" class="content code-group">
      <slot></slot>
    </div>

    <div>
      <span class="code-tab contracted-view " v-if="expanded">{{closeBracket}}</span>
    </div>

  </div>
</template>

<script lang="ts">
import { ExpandableCodeGroup } from './expandable-code-group';
export default ExpandableCodeGroup;
</script>

<style lang="scss">
@import '@/assets/variables.scss';
  .expand-contract {
    margin-right: 8px;
    cursor: pointer;

    &:hover {
      background-color: $hovercolor;
      color: $textcolor;
    }
  }

  .code-group {
    padding-left: 27px;
  }

  .code-tab {
    margin-left: $code-tab;
  }

  .contracted-view {
    cursor: default;
  }

  .expanded-view {
    cursor: pointer;

    &:hover {
      font-weight: bold;
    }
  }
</style>
