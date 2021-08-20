<template>
  <div>
    <div d-flex align-items-stretch class="code-grp-tgl">
      <b-badge
        class="expand-contract"
        variant="light"
        v-if="expanded"
        @click="expanded = !expanded">-</b-badge>
      <b-badge
        class="expand-contract"
        variant="light"
        v-else
        @click="expanded = !expanded">+</b-badge>
      <editable-label
        v-if="name"
        :value="name"
        :tooltip="tooltip"
        @change="$emit('changeName', $event)">
      </editable-label>
      <span v-if="expanded && bracketsView.left" class="contracted-view">{{ bracketsView.left }}</span>
      <span v-else-if="bracketsView.left && bracketsView.right" 
        class="expanded-view" @click="expanded = !expanded">{{ bracketsView.left }}...{{ bracketsView.right }}</span>
      <span v-if="deletable" v-once @click.stop="$emit('delete')"
        title="Delete option"
        class="delete-item">
        <b-icon icon="x" aria-label="Delete option" />
      </span>
    </div>

    <div v-show="expanded" class="content code-group">
      <slot></slot>
    </div>

    <div>
      <span class="code-tab contracted-view" v-if="expanded && bracketsView.right">{{ bracketsView.right }}</span>
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
  background: none !important;
  margin-right: 8px;
  cursor: pointer;
  font-size: 12px !important;

  &:hover {
    font-weight: bold !important;
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
