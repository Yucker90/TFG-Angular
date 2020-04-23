import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./plantilla/shell/login/login.component";
import { EventListComponent } from "./plantilla/shell/event-list/event-list.component";
import { UserListComponent } from "./plantilla/shell/user-list/user-list.component";
import { UserFormComponent } from "./plantilla/shell/user-form/user-form.component";
import { EventDetailsComponent } from "./plantilla/shell/event-details/event-details.component";
import { NewsComponent } from "./plantilla/shell/news/news.component";
import { UserDetailsComponent } from "./plantilla/shell/user-details/user-details.component";
import { NewsFormComponent } from "./plantilla/shell/news-form/news-form.component";
import { MainPageComponent } from "./plantilla/shell/main-page/main-page.component";
import { EmailConfirmationComponent } from "./plantilla/shell/email-confirmation/email-confirmation.component";
import { EventFormComponent } from './plantilla/shell/event-form/event-form.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "news",
    component: NewsComponent,
  },
  {
    path: "eventlist",
    component: EventListComponent,
  },
  { path: "userlist", component: UserListComponent },
  {
    path: "userform",
    component: UserFormComponent,
  },
  {
    path: "eventdetails/:id",
    component: EventDetailsComponent,
  },
  {
    path: "userdetails/:id",
    component: UserDetailsComponent,
  },
  {
    path: "newsform",
    component: NewsFormComponent,
  },
  {
    path: "confirm-account",
    component: EmailConfirmationComponent,
  },
  {
    path: "",
    component: MainPageComponent,
  },
  {
    path:"eventform",
    component: EventFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
