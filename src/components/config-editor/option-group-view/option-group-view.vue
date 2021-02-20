<template>
  <div v-if="data">
    <expandable-code-group
      :name="data.name"
      :tooltip="data.description"
      openBracket="{"
      closeBracket="}"
      :deletable="data.root"
      @changeName="changeGroupName($event)"
      @delete="$emit('delete')">
      <template v-for="option in data.options">
        <option-view :key="option.id" :data="option" @delete="deleteProperty($event, option.id)"></option-view>
      </template>

      <template v-for="nested in data.nestedGroups">
        <option-group-view :key="nested.id" :data="nested" @delete="deleteNested(nested.name, nested.id)"></option-group-view>
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
