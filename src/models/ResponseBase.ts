export class ResponseBase<T> {
    ok: boolean;
    message?: string;
    value?: T;

    constructor(ok: boolean, message?: string, value?: T) {
        this.ok = ok;
        this.message = message;
        this.value = value;
    }
}
