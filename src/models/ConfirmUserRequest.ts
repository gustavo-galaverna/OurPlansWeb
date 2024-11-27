export class ConfirmUserRequest {
    confirmationCode: string;
    username: string;

    constructor(code:string, email: string) {
        this.username = email;
        this.confirmationCode = code;
    }
}
