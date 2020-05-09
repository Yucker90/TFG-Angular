import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShellComponent } from "./shell/shell.component";
import { HeaderComponent } from "./shell/header/header.component";
import { MainComponent } from "./shell/main/main.component";
import { FooterComponent } from "./shell/footer/footer.component";
import { NavbarComponent } from "./shell/navbar/navbar.component";
import { EventListComponent } from "./shell/event-list/event-list.component";
import { UserListComponent } from "./shell/user-list/user-list.component";
import { UserFormComponent } from "./shell/user-form/user-form.component";
import { UserDetailsComponent } from "./shell/user-details/user-details.component";
import { EventDetailsComponent } from "./shell/event-details/event-details.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./shell/login/login.component";
import { RouterModule } from "@angular/router";
import { NewsComponent } from "./shell/news/news.component";
import { NgxPaginationModule } from "ngx-pagination";
import { NewsFormComponent } from "./shell/news-form/news-form.component";
import { MainPageComponent } from "./shell/main-page/main-page.component";
import { EmailConfirmationComponent } from "./shell/email-confirmation/email-confirmation.component";
import { MustMatchDirective } from "./validators/mustmatchdirective";
import { RequiredDirective } from "./validators/requiredDirective";
import { EventFormComponent } from "./shell/event-form/event-form.component";
import { RolFormComponent } from "./shell/rol-form/rol-form.component";
import { ErrorComponent } from "./shell/error/error.component";
import { RolListComponent } from "./shell/rol-list/rol-list.component";
import { RoldetailsComponent } from "./shell/roldetails/roldetails.component";
import { NewseditComponent } from "./shell/newsedit/newsedit.component";
import { WorkEditComponent } from './shell/work-edit/work-edit.component';

@NgModule({
  declarations: [
    RequiredDirective,
    MustMatchDirective,
    ShellComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    NavbarComponent,
    EventListComponent,
    UserListComponent,
    UserFormComponent,
    UserDetailsComponent,
    EventDetailsComponent,
    LoginComponent,
    NewsComponent,
    NewsFormComponent,
    MainPageComponent,
    EmailConfirmationComponent,
    EventFormComponent,
    RolFormComponent,
    ErrorComponent,
    RolListComponent,
    RoldetailsComponent,
    NewseditComponent,
    WorkEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
  ],
  exports: [ShellComponent],
})
export class PlantillaModule {}
