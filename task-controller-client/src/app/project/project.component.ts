import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from "../services/project.service";
import {Project} from "../model/project";
import {Task} from "../model/task";
import {Header} from 'primeng/primeng';
import {Footer} from 'primeng/primeng';
import {User} from "../model/user";
import {InputTextareaModule} from 'primeng/primeng';
import {TaskService} from "../services/task.service";
import {UserService} from "../services/user.service";
import {SelectItem} from 'primeng/primeng';
import {forEach} from "@angular/router/src/utils/collection";
import {InputSwitchModule} from 'primeng/primeng';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  id: number;
  checked = false;
  project: Project = new Project(0,'',new Date());
  tasks: Task[];
  task:Task;
  dialogVisible = false;
  model:any = {};
  isDisabled = true;
  freeDevelopers: User[];
  targetProjectDevelopers: User[];
  allDevelopers:User[];
  developers: SelectItem[];
  statuses:SelectItem[];
  selectedStatus:any;
  constructor(private route: ActivatedRoute,
              private projectService:ProjectService,
              private taskService:TaskService,
              private userService: UserService,
              private router: Router
  ) { }

  ngOnInit() {
    this.statuses = [];
    this.selectedStatus = {};
    this.statuses.push({label:'waiting', value:{name: 'waiting'}});
    this.statuses.push({label:'implementation', value:{name: 'implementation'}});
    this.statuses.push({label:'verifying', value:{name: 'verifying'}});
    this.freeDevelopers = [];
    this.targetProjectDevelopers = [];

    this.route.params.subscribe(params => {
      this.id =+params['id'];
    });

    this.developers = [];

    this.userService.getAllDevelopers()
      .subscribe(data =>{
        this.allDevelopers = data;
        for(let entry of this.allDevelopers) {
          this.developers.push({label: entry.username, value: {id: entry.id}});
        }
      });

    this.userService.getFreeDevelopers(this.id)
      .subscribe(data => {
          this.freeDevelopers = data;
      });

    this.userService.getCurrentProjectDevelopers(this.id)
      .subscribe(data => {
        this.targetProjectDevelopers = data;
      });

    this.projectService.getById(this.id)
      .subscribe(data =>{
        //console.log('message');
        this.project = data;
      });

    this.projectService.getTasksById(this.id)
      .subscribe(data => this.tasks = data);

    this.task = new Task(0,'','','',0);
  }

  selectTask(task:number){
    this.router.navigate(['/task', task]);
    console.log(task);
  }

  displayDialog(event){
    this.dialogVisible = true;
  }

  justForDeveloper(){
    if(this.checked){
      console.log("for developer");
      this.taskService.getUserTasks(this.id)
        .subscribe(data => {
          this.tasks = data;
        })
    }else{
      this.projectService.getTasksById(this.id)
        .subscribe(data => this.tasks = data);
    }
  }

  update(){
    this.projectService.updateProject(this.project)
      .subscribe(data => this.project = data);
  }

  updateProjectDevelopers(){
    this.projectService.updateProjectDevelopers(this.targetProjectDevelopers, this.id)
      .subscribe(data=>{

      })
  }

  moveToTarget(){
    this.updateProjectDevelopers();
  }

  moveToSource(){
    this.updateProjectDevelopers();
  }
  save(){
    this.task.userTask = this.model.selected.id;
    console.log(this.task.userTask);
    this.task.status = this.selectedStatus.name;
    this.taskService.addNewTask(this.task, this.id, this.task.userTask)
      .subscribe(data =>{
        this.task = data;
        this.tasks.push(this.task);
      });

  }
  date(){
    return '12345';
  }
  isDeveloper(){
    if(localStorage.getItem('role')=='2'){
      return true;
    }
    return false;
  }
  toggleDisabled(){
    this.isDisabled = !this.isDisabled;
    if(this.isDisabled){
      this.update();
    }
  }
}
