export class LoginRequest {
    username: string;
    password: string;

    constructor(email: string, password: string) {
        this.username = email;
        this.password = password;
    }
}
