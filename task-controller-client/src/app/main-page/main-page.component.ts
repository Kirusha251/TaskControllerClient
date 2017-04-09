import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import {Project} from "../model/project";
import {isNumber} from "util";
import {User} from "../model/user";
import {UserService} from "../services/user.service";
//import current = SyntaxKind.current;
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  projects: Project[];
  model:any = {};
  selectedProject: Project;
  dialogVisible: boolean;
  project: Project;
  cols: any[];
  currentUser: User;
  constructor(
              private projectService: ProjectService,
              private router:Router,
              private userService: UserService
  ) { }

  ngOnInit() {
    console.log("init");
    //this.currentUser = JSON.parse(localStorage.getItem('user'));

    this.userService.getSignedUser()
      .subscribe(data =>{
        localStorage.setItem('role',data.role.toString());
      });

    this.projectService.getAllByUser()
        .subscribe(data => this.projects = data);

    this.cols = [
      {field: 'name', header: 'Project name'},
      {field: 'createdAt', header: 'Project created at'},
    ];
  }

  showProject(project: Project){
    this.selectedProject = project;
    this.dialogVisible = true;
  }

  clicked(event){
    this.router.navigate(['/project', event.data.id]);
    console.log("click" + event.data.id);
  }

  displayDialog(event){
    this.project = new Project(0,'',new Date());
    this.dialogVisible = true;
  }

  save(){
    this.projectService.addNewProject(this.project)
      .subscribe(data => {
        this.project = data
        console.log(data)
        this.projects.push(data);
      });
  }

}
