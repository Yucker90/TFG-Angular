import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./plantilla/shell/login/login.component";
import { EventListComponent } from "./plantilla/shell/event-list/event-list.component";
import { UserListComponent } from "./plantilla/shell/user-list/user-list.component";
import { UserFormComponent } from "./plantilla/shell/user-form/user-form.component";
import { EventDetailsComponent } from './plantilla/shell/event-details/event-details.component';
import { NewsComponent } from './plantilla/shell/news/news.component';
import { UserDetailsComponent } from './plantilla/shell/user-details/user-details.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },{
    path: 'news',
    component: NewsComponent
  }
  ,
  {
    path: "eventlist",
    component: EventListComponent,
  },
  { path: "userlist", component: UserListComponent },
  {
    path: "userform",
    component: UserFormComponent,
  },{
    path: 'eventdetails', component: EventDetailsComponent
  },
  {
    path: 'userdetails', component: UserDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
