import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Comment} from "../model/comment";
import {Observable} from "rxjs";

@Injectable()
export class CommentService {

  constructor(private http:Http) { }


  createComment(comment:Comment, id:number):Observable<Comment>{
    return this.http.post('http://localhost:8080/comment/save/task/'+id,comment,this.jwt())
      .map(response => <Comment>response.json());
  }

  deleteComment(id:number):Observable<Comment[]>{
    return this.http.delete('http://localhost:8080/comment/delete/'+id, this.jwt())
      .map(response => <Comment[]>response.json());
  }

  updateComment(comment:Comment):Observable<Comment[]>{
    return this.http.put('http://localhost:8080/comment/update/', comment, this.jwt())
      .map(response => <Comment[]>response.json());
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
