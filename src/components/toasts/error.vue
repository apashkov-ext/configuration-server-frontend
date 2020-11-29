<template>
    <div>
    <b-button @click="$bvToast.show('my-toast')">Show toast</b-button>

    <b-toast id="my-toast" variant="danger" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">Notice!</strong>
          <small class="text-muted mr-2">42 seconds ago</small>
        </div>
      </template>
      This is the content of the toast.
      It is short and to the point.
    </b-toast>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class DialogWrapper extends Vue {
    @Prop() title!: string;
    @Prop() message!: string;
}
</script>

<style lang="scss">
#dialog-wrapper {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}

#dialog-content {
    padding: 20px;
}

#dialog-overlay {
    height: 100%;
    width: 100%;
}
</style>
