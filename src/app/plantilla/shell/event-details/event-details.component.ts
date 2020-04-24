import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from 'src/app/servicios/eventos.service';
import { Evento } from 'src/app/interfaces/evento';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  evento: Evento;
  idEvento: string;

  constructor(private route: ActivatedRoute, private eventosService: EventosService) { }

  ngOnInit() {
   this.idEvento= this.route.snapshot.paramMap.get("id");
    this.eventosService.getEvento(this.idEvento).subscribe(
      (data) => {
        this.evento = data;
      },
      (error) => {
        console.log(error);
      }
    );

    /* if trabajadores.count >= necesarios{
        apuntarse.disabled
    }
    */
  }

  apuntarse(){
    document.getElementById("formTrabajo").hidden = false;
  }

  solicitud(){
    //TODO
    // rolService.enviarTrabajo(evento, idusuario, rol)
  }

}
