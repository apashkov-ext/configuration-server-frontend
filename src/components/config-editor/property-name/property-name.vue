<template>

  <div class="d-inline">

      <span v-show="editorMode" class='property-name' @click="edit()">{{value}}</span>
      
        <b-input  
          v-autowidth="{maxWidth: '400px', minWidth: '40px', comfortZone: 0}"
          type="text"
          class="property-name-val"
          v-model="temp"
          @keydown.native.enter="commit(temp)"
          @keydown="resize()"
          @keydown.native.esc="cancel()"
          @blur="cancel()"
          ref="valueInput">
          <!-- @blur="cancel()" -->
        </b-input>

      <span v-if="separator">{{separator}}</span>

  </div>
</template>

<script lang="ts">
import { PropertyName } from './property-name';
export default PropertyName;
</script>

<style lang="scss">
@import '@/assets/variables.scss';
.property-name-val {
  border: none !important;
  background-color:rgba(0, 0, 0, 0) !important;
  background-image: none !important;
  padding: 0 !important;
  display: inline-block !important;

  &:hover {
    cursor: pointer !important;
    color: $prop-name-hover-color !important;
  }

  &:focus {
    font-weight: bold !important;
    box-shadow: none !important;
    cursor: text !important;
    color: $prop-name-hover-color !important;
  }

  height: 26px !important;
}
.property-name {
  cursor: pointer;

  &:hover {
    background-color: $hovercolor;
    color: $textcolor;
  }
}

</style>
