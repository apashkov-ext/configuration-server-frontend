import _Vue from 'vue';

export function ToastrPlugin(Vue: typeof _Vue, options?: any) {
    Vue.prototype.$toastSuccess = function(text: string) {
        this.$bvToast.toast(text, {
            title: 'Success',
            solid: false,
            appendToast: true,
            toaster: 'b-toaster-bottom-right',
            variant: 'success'
        });
    }
    
    Vue.prototype.$toastWarn = function(text: string) {
        this.$bvToast.toast(text, {
            title: 'Note',
            solid: false,
            appendToast: true,
            toaster: 'b-toaster-bottom-right',
            variant: 'warning'
        });
    }
    
    Vue.prototype.$toastError = function(text: string) {
        this.$bvToast.toast(text, {
            title: 'Error',
            solid: false,
            appendToast: true,
            toaster: 'b-toaster-bottom-right',
            variant: 'danger'
        });
    }

}