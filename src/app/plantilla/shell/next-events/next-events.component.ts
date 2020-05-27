import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/servicios/eventos.service';

@Component({
  selector: 'app-next-events',
  templateUrl: './next-events.component.html',
  styleUrls: ['./next-events.component.css']
})
export class NextEventsComponent implements OnInit {

  constructor(private eventoService: EventosService) {}

  events: any;

  ngOnInit() {
    this.events = this.eventoService.getNextEventos();
  }
}