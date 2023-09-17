export class ProfileUserDTO {
    
    firstName : string | undefined;
    lastname : string | undefined;
    username: string;
    email : string;
    avatarUrl : string | undefined;
  
    constructor(firstName : string | undefined, 
        lastname : string | undefined, username: string, email : string, avatarUrl : string | undefined) {
        this.firstName = firstName;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.avatarUrl = avatarUrl;
    }

}