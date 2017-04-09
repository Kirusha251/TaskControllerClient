import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Task} from "../model/task";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {Comment} from "../model/comment";
@Injectable()
export class TaskService {

  constructor(private http: Http) { }

  addNewTask(task: Task, id:number, idUser:number): Observable<Task>{
    return this.http.post('http://localhost:8080/task/add/by-project-id/'+id+'/'+idUser,task, this.jwt())
      .map(response => <Task> response.json());
  }

  getAllCommentsByTaskId(id:number):Observable<Comment[]>{
    return this.http.get('http://localhost:8080/task/comments/'+id, this.jwt())
      .map(response=> <Comment[]> response.json());
  }
  getUserTasks(id:number):Observable<Task[]>{
    return this.http.get('http://localhost:8080/task/all/developer/'+id, this.jwt())
      .map(response => <Task[]>response.json());
  }
  getTaskById(id:number):Observable<Task>{
    return this.http.get('http://localhost:8080/task/id/'+id, this.jwt())
      .map(response => <Task> response.json());
  }

  getUserByTaskId(id:number):Observable<User>{
    return this.http.get('http://localhost:8080/task/user/id/'+id, this.jwt())
      .map(response=> <User> response.json());
  }

  updateTask(task:Task, idUser:number):Observable<Task>{
    return this.http.put('http://localhost:8080/task/update/'+idUser, task,this.jwt())
      .map(response=> <Task> response.json())
  }
  private jwt() {
    // create authorization header with jwt token
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      let headers = new Headers({'authorization':currentUser});
      headers.append( 'Content-Type','application/json');
      return new RequestOptions({headers: headers});
    }
  }
}
