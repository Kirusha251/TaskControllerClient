import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Project} from "../model/project";
import {ObservableInput} from "rxjs/Observable";
import {Observable} from "rxjs";
import {Task} from "../model/task";
import {User} from "../model/user";
@Injectable()
export class ProjectService {

  constructor(private http: Http) {
  }

  getAll():Observable<Project[]>{
    return this.http.get('http://localhost:8080/project/all', this.jwt())
      .map(response => <Project[]>response.json());
  }
  getAllByUser():Observable<Project[]>{
    return this.http.get('http://localhost:8080/project/all/by-user', this.jwt())
      .map(response => <Project[]>response.json());
  }
  getById(id:number): Observable<Project>{
    return this.http.get('http://localhost:8080/project/id/'+id, this.jwt())
      .map(response => <Project>response.json());
  }

  updateProject(project:Project):Observable<Project>{
    return this.http.put('http://localhost:8080/project/update',JSON.stringify(project), this.jwt())
      .map(response=> <Project>response.json());
  }

  updateProjectDevelopers(users:User[], id:number):Observable<Project>{
    return this.http.put('http://localhost:8080/project/update/developers/'+id,JSON.stringify(users), this.jwt())
      .map(response=> <Project>response.json());
  }

  getTasksById(id:number): Observable<Task[]>{
    return this.http.get('http://localhost:8080/project/tasks/'+id, this.jwt())
      .map(response => <Task[]>response.json());
  }

  getDevelopers(id:number): Observable<User[]>{
    return this.http.get('http://localhost:8080/project/developers/' + id, this.jwt())
      .map(response => <User[]> response.json());
  }
  addNewProject(project:Project):Observable<Project>{
    return this.http.post('http://localhost:8080/project/add',JSON.stringify(project),this.jwt())
      .map(response => <Project> response.json());

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
