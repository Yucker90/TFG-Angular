import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './shell/header/header.component';
import { MainComponent } from './shell/main/main.component';
import { FooterComponent } from './shell/footer/footer.component';
import { NavbarComponent } from './shell/navbar/navbar.component';
import { EventListComponent } from './shell/event-list/event-list.component';
import { UserListComponent } from './shell/user-list/user-list.component';
import { UserFormComponent } from './shell/user-form/user-form.component';
import { UserDetailsComponent } from './shell/user-details/user-details.component';
import { EventDetailsComponent } from './shell/event-details/event-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ShellComponent, HeaderComponent, MainComponent, FooterComponent, NavbarComponent, EventListComponent, UserListComponent, UserFormComponent, UserDetailsComponent, EventDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule
  ],
  exports: [ShellComponent]
})
export class PlantillaModule { }
