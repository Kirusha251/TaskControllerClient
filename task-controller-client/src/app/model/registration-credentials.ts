export class RegistrationCredentials {
  id:number;
  role:number;
  email:string;
  password:string;
  username:string;

  constructor(role: number, email: string, password: string, username: string) {
    this.id = 0;
    this.role = role;
    this.email = email;
    this.password = password;
    this.username = username;
  }
}
