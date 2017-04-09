import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:User;
  username:any ={};
  constructor(
    private userService:UserService,
    private authenticationService:AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  checkForLogin(){
    if(localStorage.getItem('currentUser')){
      if(this.user == null) {
        this.userService.getSignedUser()
          .subscribe(data => {
            this.user = data
            this.username = this.user.username;
          });
      }
      return true;
    }
    else{
      return false;
    }
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
