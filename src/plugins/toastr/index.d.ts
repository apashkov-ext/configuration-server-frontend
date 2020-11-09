declare module 'vue/types/vue' {
  interface Vue {
    readonly $toastSuccess: (text: string) => void;
    readonly $toastWarn: (text: string) => void;
    readonly $toastError: (text: string) => void;
  }
}