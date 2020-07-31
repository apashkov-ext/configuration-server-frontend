<template>
    <dialog-wrapper :title="title" :message="message">
        <div class="d-flex justify-content-between">
            <div>
                <b-button @click="ok()">Ok</b-button>
            </div>
            <div>
                <b-button @click="cancel()">Cancel</b-button>
            </div>
        </div>
    </dialog-wrapper>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import DialogWrapper from './dialog-wrapper.vue'

@Component({
    components: { DialogWrapper }
})
export default class Confirm extends Vue {
    @Prop() title!: string;
    @Prop() message!: string;
    @Prop() resolveFn!: (value?: boolean | PromiseLike<boolean> | undefined) => void;
    @Prop() rejectFn!: (reason?: any) => void;

    private ok() {
        this.resolveFn(true);
        this.close();
    }

    private cancel() {
        this.resolveFn(false);
        this.close();
    }

    private close() {
        this.$destroy();
        this.$el.remove();
    }
}
</script>

<style lang="scss">
</style>
