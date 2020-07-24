<template>
    <div id="dialog-wrapper">
        <b-overlay show id="dialog-overlay">
            <template v-slot:overlay>
                <div id="dialog-content" class="card">
                    <h5 id="dialog-title">{{title}}</h5>                   
                    <p id="dialog-message" class="text-justify">{{message}}</p>
                    <div id="dialog-elements">
                        <slot></slot>
                    </div>
                </div>
            </template>
        </b-overlay>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Dialog extends Vue {
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
