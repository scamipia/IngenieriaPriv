export class RegisterUserDTO {
    firstName : string | undefined;
    lastname: string | undefined
    username: string;
    email: string;
    password: string;
    

    constructor(firstName : string | undefined, lastname: string | undefined,
        username: string, email: string, password : string,
        ) {
        this.firstName = firstName;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.password = password;
        
    }
}