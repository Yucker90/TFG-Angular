import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './shell/header/header.component';
import { MainComponent } from './shell/main/main.component';
import { FooterComponent } from './shell/footer/footer.component';
import { NavbarComponent } from './shell/navbar/navbar.component';
import { EventListComponent } from './shell/event-list/event-list.component';



@NgModule({
  declarations: [ShellComponent, HeaderComponent, MainComponent, FooterComponent, NavbarComponent, EventListComponent],
  imports: [
    CommonModule
  ],
  exports: [ShellComponent]
})
export class PlantillaModule { }
