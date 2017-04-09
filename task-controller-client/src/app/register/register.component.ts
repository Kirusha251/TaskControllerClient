import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import {SelectItem} from 'primeng/primeng';
import {User} from "../model/user";
import {RegistrationCredentials} from "../model/registration-credentials";

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;
  roles: SelectItem[];
  selectedRole: string;
  constructor(
      private router: Router,
      private userService: UserService,
      private alertService: AlertService
  ) {
    this.roles = [];
    this.roles.push({label:'Developer', value:{id:2, name:'Developer', code:'Dev'}});
    this.roles.push({label:'Manager', value:{id:1, name:'Manager', code:'Man'}});
  }

  ngOnInit() {
  }
  register(){
      this.loading = true;
      //let id = this.model.role;
      //console.log(id.id.toString());
      let user = new RegistrationCredentials(
        this.model.role.id,
        this.model.email,
        this.model.password,
        this.model.username);
      this.userService.create(user)
          .subscribe(
              data => {
                console.log("nice");
                  this.alertService.success('Registration successful', true)
                  this.router.navigate(['/login']);
              },
              error => {
                  this.alertService.error("Error bad Credentials!");
                  this.loading = false;
              }
          )
  }

}
