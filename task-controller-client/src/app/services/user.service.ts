import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {User} from "../model/user";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AlertService} from "./alert.service";

@Injectable()
export class UserService {

  constructor(private http: Http,
  private router:Router,
  private alertService:AlertService) { }

  create(user: any){
    return this.http.post('http://localhost:8080/user/create', user, this.jwt()).
          map((response: Response) =>{
          // if(response.ok){
          //   this.router.navigate(['/login']);
          //   this.alertService.success('Registration successful', true)
          // }else{
          //   this.alertService.error('Bad credentials');
          // }
    });
    }

  getUser(email:any):Observable<User>{
    return this.http.get('http://localhost:8080/user/email/'+email+'/',this.jwt())
      .map(response => <User> response.json());
  }
  getSignedUser():Observable<User>{
    return this.http.get('http://localhost:8080/user/signed',this.jwt())
      .map(response => <User> response.json());
  }
  getUserById(id:number):Observable<User>{
    return this.http.get('http://localhost:8080/user/id/'+id, this.jwt())
      .map(response => <User> response.json());
  }
  getAllDevelopers(){
    return this.http.get('http://localhost:8080/user/all-developers/', this.jwt())
      .map(response => <User[]> response.json());
  }

  getCurrentProjectDevelopers(id: any):Observable<User[]>{
    return this.http.get('http://localhost:8080/user/project-dev/'+id, this.jwt())
      .map(response=> <User[]> response.json());
  }

  getFreeDevelopers(id:any):Observable<User[]>{
    return this.http.get('http://localhost:8080/user/free-dev/'+id, this.jwt())
      .map(response => <User[]> response.json());
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
