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



@NgModule({
  declarations: [ShellComponent, HeaderComponent, MainComponent, FooterComponent, NavbarComponent, EventListComponent, UserListComponent, UserFormComponent],
  imports: [
    CommonModule
  ],
  exports: [ShellComponent]
})
export class PlantillaModule { }
