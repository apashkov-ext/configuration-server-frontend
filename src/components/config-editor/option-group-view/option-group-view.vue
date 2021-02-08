<template>
  <div v-if="data">
    <expandable-code-group
      :name="data.name"
      :tooltip="data.description"
      openBracket="{"
      closeBracket="}"
      @changeName="changeGroupName($event)"
    >
      <template v-for="option in data.options">
        <option-view :key="option.id" :data="option"> </option-view>
      </template>

      <template v-for="nested in data.nestedGroups">
        <option-group-view :key="nested.id" :data="nested"></option-group-view>
      </template>

      <div class="add-prop-wrapper">
        <new-item
          class="add-prop"
          max-length="128"
          placeholder="add property..."
          @onCommit="add($event)"
        ></new-item>
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
