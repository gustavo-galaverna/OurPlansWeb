export class UserRequest {
    name: string;
    lastname: string;
    birthdate: Date;
    email: string;
    password: string;

    constructor(name: string, lastname: string, birthdate: Date, email: string, password: string) {
        this.name = name;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.email = email;
        this.password = password;
    }
}
