import { Component, OnInit } from "@angular/core";
import { EventosService } from "src/app/servicios/eventos.service";

@Component({
  selector: "app-next-events",
  templateUrl: "./next-events.component.html",
  styleUrls: ["./next-events.component.css"],
})
export class NextEventsComponent implements OnInit {
  constructor(private eventoService: EventosService) {}

  events = [];
  showEvents = false;

  // Obtenemos los próximos 3 eventos. Si no hay eventos, mostraremos un mensaje
  ngOnInit() {
    this.eventoService.getNextEventos().subscribe((data) => {
      this.events = data;
      this.showEvents = this.events.length != 0;
    });
  }
}
