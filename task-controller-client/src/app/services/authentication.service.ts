import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {User} from "../model/user";

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

  login(email: string, password: string) {
    console.log("resp");
        return this.http.post('http://localhost:8080/login', JSON.stringify({ email: email, password: password }))// TODO: change request url
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let headers = response.headers.getAll("authorization");
                if (headers) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', headers.toString());
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

}
