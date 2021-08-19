<template>
  <div>
    <b-input :id="'new-item-' + id"
      class="new-item-input"
      :placeholder="placeholder || ''"
      v-model="value"
      v-autowidth="{ maxWidth: '400px', minWidth: '160px', comfortZone: 0 }"
      :maxlength="maxLength"
      @keydown.native.enter="onEnter($event)"
      @keydown.native.esc="onEsc()"
      @blur="onEsc()"
      ref="valueInput">
    </b-input>
    <b-tooltip :target="'new-item-' + id" triggers="focus" custom-class="new-item-tooltip" delay="{show:1000, hide:40}">
      <slot name="tooltip"></slot>
    </b-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class NewItem extends Vue {
  @Prop() placeholder!: string;
  @Prop() maxLength!: number;
  @Prop() id!: string;

  private value = '';

  onEnter(event: any) {
    this.commit(this.value);
    event.target && event.target.blur();
  }

  onEsc() {
    this.value = '';
  }

  private commit(value: string) {
    this.$emit('onCommit', value);
    this.value = '';
  }
}
</script>

<style lang="scss">

.new-item-input {
  border: none !important;
  background-color: rgba(0, 0, 0, 0) !important;
  padding: 0 !important;
  height: 1em !important;
  margin-top: 1px;
  &:focus {
    box-shadow: none !important;
  }
}
</style>
