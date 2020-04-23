import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/servicios/eventos.service';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/interfaces/evento';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  adminPrivileges= parseInt(Cookies.get('USER_ACCESS'))!=1;
  eventos: Observable<Evento[]>;

  constructor(private eventosService: EventosService) { }

  ngOnInit() {
    this.eventos = this.eventosService.getEventos();
    if(parseInt(Cookies.get("USER_ACCESS")) !==1 ){

        }
  }

apuntarse(id: number){
  console.log(id);
}

}
