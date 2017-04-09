export class Project {
  private id:number;
  private name:string;
  private createdAt:string;
  constructor(id: number, name: string, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt.toDateString();
  }

}
