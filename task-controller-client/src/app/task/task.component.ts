import { Component, OnInit } from '@angular/core';
import {Task} from "../model/task";
import {TaskService} from "../services/task.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../model/user";
import {UserService} from "../services/user.service";
import {SelectItem} from "primeng/components/common/api";
import {Comment} from "../model/comment";
import {CommentService} from "../services/comment.service";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task:Task;
  id:number;
  developers:User[];
  statuses: SelectItem[];
  developersList: SelectItem[];
  isDisabled = true;
  currentDeveloper:User;
  selectedDeveloper:any;
  commentContent:string;
  comments: Comment [];
  isChanged = false;
  currentStatus:any;
  changedCommentId:number;
  constructor(
    private taskService:TaskService,
    private route: ActivatedRoute,
    private userService:UserService,
    private commentService:CommentService
  ) {

  }

  ngOnInit() {
    this.changedCommentId = 0;
    this.comments = [];
    this.developersList = [];
    this.statuses = [];
    this.selectedDeveloper = ({id: 0});
    this.currentDeveloper = new User(1,1,'');
    this.task = new Task(0,'','','',0);
    this.currentStatus = {};
    this.statuses.push({label:'waiting', value:{name: 'waiting'}});
    this.statuses.push({label:'implementation', value:{name: 'implementation'}});
    this.statuses.push({label:'verifying', value:{name: 'verifying'}});
    this.developers = [];

    this.route.params.subscribe(params => {
      this.id =+params['id'];
      if(params){
        this.taskService.getUserByTaskId(this.id)
          .subscribe(data=> this.currentDeveloper = data);
      }
    });


    this.taskService.getTaskById(this.id)
      .subscribe(data=>{
        this.task = data;
        this.currentStatus.label = this.task.status;
        this.currentStatus.name = this.task.status;
      });

    this.taskService.getAllCommentsByTaskId(this.id)
      .subscribe(data=>{
        this.comments = data;
      });

    this.userService.getAllDevelopers()
      .subscribe(data =>{
        this.developers = data;
        for(let entry of this.developers) {
            this.developersList.push({label: entry.username.toString(), value: {id: entry.id, name: entry.username.toString()}});
        }
      });



  }

  createComment(){
    let comment;
    if(this.isChanged){
      this.isChanged = false;
      comment = new Comment(this.changedCommentId,'',this.commentContent);
      this.commentService.updateComment(comment)
        .subscribe(data =>{
          this.comments = data;

        });
    }else {
      comment = new Comment(1,'',this.commentContent);
      this.commentService.createComment(comment, this.id)
        .subscribe(data => {
          comment = data
          this.comments.push(comment);
        });
    }
    this.commentContent = '';

  }

  delete(event){
    console.log(event);
    this.commentService.deleteComment(event)
      .subscribe(data=> this.comments = data);
  }
  change(content:any, id:number){
    console.log('change');
    this.isChanged = !this.isChanged;
    this.commentContent = content;
    this.changedCommentId = id;
  }
  toggleDisabled(){

    this.isDisabled = !this.isDisabled;
    if(this.isDisabled){
      this.task.status = this.currentStatus.name;
      this.taskService.updateTask(this.task, this.selectedDeveloper.id)
        .subscribe(data => this.task = data);
    }
  }




}
