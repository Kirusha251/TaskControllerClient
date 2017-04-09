export class Task {
  public id:number;
  public name: string;
  public status: string;
  public description: string;
  public userTask: number;


  constructor(id: number, name: string, status: string, description: string, userTask: number) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.description = description;
    this.userTask = userTask;
  }
}
