<template>
  <div v-if="data">
    <expandable-code-group
      :name="data.name"
      :tooltip="data.description"
      brackets="{}"
      :deletable="!data.root"
      @changeName="changeGroupName($event)"
      @delete="$emit('delete')">
      <template v-for="option in data.options">
        <option-view :key="option.id" :data="option" @delete="deleteOption(option.id)" />
      </template>

      <template v-for="nested in data.nestedGroups">
        <option-group-view :key="nested.id" :data="nested" @delete="deleteNested(nested.name, nested.id)" />
      </template>

      <div class="add-prop-wrapper">
        <new-item
          class="add-prop"
          max-length="128"
          placeholder="add property..."
          :id="data.id"
          @onCommit="add($event)">
          <template v-slot:tooltip>
              <div class="add-prop-help">
                Add new property using specipic pattern:
                <table>

                  <tr>
                    <th>Pattern</th>
                    <th>Result</th>
                  </tr>

                  <tr>
                    <td class="pattern">prop: {}</td>
                    <td class="description">Option Group (object with properties)</td>
                  </tr>

                  <tr>
                    <td class="pattern">prop: true</td>
                    <td class="description">Boolean Option</td>
                  </tr>

                  <tr>
                    <td class="pattern">prop: 8</td>
                    <td class="description">Number Option</td>
                  </tr>

                  <tr>
                    <td class="pattern">prop: some string</td>
                    <td class="description">String Option</td>
                  </tr>

                  <tr>
                    <td class="pattern">prop: [8, 5]</td>
                    <td class="description">Number array Option</td>
                  </tr>

                  <tr>
                    <td class="pattern">prop: ['someStr', '12']</td>
                    <td class="description">String array Option</td>
                  </tr>

                </table>
              </div>
            </template>
        </new-item>
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

.new-item-tooltip {
  .tooltip-inner {
    max-width: 600px;
    text-align: left;

    .add-prop-help {
      margin: 1px 2px 5px 2px;

      table, td, tr, th {
        border: 1px solid $bordercolor;
      }

      table {
        margin-top: 2px;
      }

      th {
        text-align: center;
      }

      td {
        padding: 3px;
      }

      .pattern {
        min-width: 100px;
      }

      .description {
        min-width: 200px;
      }
    }
  }
}
</style>
