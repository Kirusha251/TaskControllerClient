import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ViewEncapsulation, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule}  from '@angular/router';
import { AccordionModule } from 'primeng/primeng';
import { MenuItem } from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { AlertComponent } from './alert/alert.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProjectService } from "./services/project.service";
import {DataListModule} from 'primeng/primeng';
import {PickListModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/primeng';
import {TaskService} from "./services/task.service";
import {DropdownModule} from 'primeng/primeng';
import { TaskComponent } from './task/task.component';
import {PanelModule} from 'primeng/primeng';
import {EditorModule} from 'primeng/primeng';
import {MarkdownModule} from "angular2-markdown";
import {CommentService} from "./services/comment.service";
import {ScrollToModule} from "ng2-scroll-to";
import {InputSwitchModule} from 'primeng/primeng';
import {ToggleButtonModule} from 'primeng/primeng';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'project/:id', component: ProjectComponent, canActivate: [AuthGuard] },
  { path: 'task/:id', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    MainPageComponent,
    TaskComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AccordionModule,
    DataTableModule,
    SharedModule,
    DataListModule,
    PickListModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    CalendarModule,
    DropdownModule,
    PanelModule,
    EditorModule,
    MarkdownModule.forRoot(),
    ScrollToModule.forRoot(),
    InputSwitchModule,
    ToggleButtonModule,
  ],
  providers: [
    AuthGuard,
    AlertService,
    UserService,
    AuthenticationService,
    ProjectService,
    TaskService,
    CommentService
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
