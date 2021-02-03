<template>
  <div>
    <b-input class="new-item-input" :placeholder="placeholder || ''" v-model="value" v-bind:maxlength="maxLength" 
      @keydown.native.enter="onEnter($event)" 
      @keydown.native.esc="onEsc()"
      @keydown.native="onKeyDown($event)"
      @blur="onEsc()">
  </b-input>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class NewItem extends Vue {
  @Prop() placeholder!: string;
  @Prop() maxLength!: number;

  private value = '';

  onEnter(event: any) {
    this.commit(this.value);
    event.target && event.target.blur();   
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
        event.preventDefault();
        return;
    }
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
  background-color:rgba(0, 0, 0, 0) !important;
  padding: 0 !important;
  height: 1em !important;
  margin-top: 1px;
  &:focus {
    box-shadow: none !important;
  }
}

// .new-item-input:focus {
//     border: none !important;
//   }
</style>
