export interface Toastr {
    error(msg: string): void;
    warn(msg: string): void;
    success(msg: string): void;
    info(msg: string): void;
}