import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import {User} from "../model/user";
import {UserService} from "../services/user.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private authenticationService:AuthenticationService,
    private alertService:AlertService,
    private userService:UserService
  ) { }


  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(){
    this.loading = true;
    let user:User = null;
    this.authenticationService.login(this.model.email, this.model.password)
        .subscribe(
            data =>{
                    this.router.navigate([this.returnUrl]);
            },
            error =>{
                this.alertService.error(error);
                this.loading = false;
            });
  }

}
