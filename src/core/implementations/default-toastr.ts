import { Toastr } from '../abstractions/toastr';
import Vue from 'vue';

export class DefaultToastr implements Toastr {
    private vm = new Vue({});

    error(msg: string): void {
        this.vm.$bvToast.toast(msg, {
            title: 'Error',
            solid: false,
            appendToast: true,
            toaster: 'b-toaster-bottom-right',
            variant: 'danger'
        });
    }

    warn(msg: string): void {
        this.vm.$bvToast.toast(msg, {
            title: 'Note',
            solid: false,
            appendToast: true,
            toaster: 'b-toaster-bottom-right',
            variant: 'warning'
        });
    }

    success(msg: string): void {
        this.vm.$bvToast.toast(msg, {
            title: 'Success',
            solid: false,
            appendToast: true,
            toaster: 'b-toaster-bottom-right',
            variant: 'success'
        });
    }

    info(msg: string): void {
        this.vm.$bvToast.toast(msg, {
            title: 'Info',
            solid: false,
            appendToast: true,
            toaster: 'b-toaster-bottom-right',
            variant: 'info'
        });
    }
}