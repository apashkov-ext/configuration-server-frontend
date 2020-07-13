<template>
    <div id="dialog-wrapper">
        <b-overlay show id="dialog-overlay">
            <template v-slot:overlay>
                <div id="dialog-content" class="card">
                    <h5 id="dialog-title">{{title}}</h5>
                    <p id="dialog-message" class="text-justify">{{message}}</p>
                    <div class="d-flex justify-content-between">
                        <div>
                            <b-button @click="ok()">Ok</b-button>
                        </div>
                        <div>
                            <b-button @click="cancel()">Cancel</b-button>
                        </div>
                    </div>
                </div>
            </template>
        </b-overlay>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
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
