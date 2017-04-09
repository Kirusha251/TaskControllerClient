export class User {
  id:number;
  role:number;
  username:string;


  constructor(id: number, role: number, username: string) {
    this.id = id;
    this.role = role;
    this.username = username;
  }
}
