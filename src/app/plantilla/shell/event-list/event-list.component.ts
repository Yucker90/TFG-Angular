import { Component, OnInit } from "@angular/core";
import { EventosService } from "src/app/servicios/eventos.service";
import { Observable } from "rxjs";
import { Evento } from "src/app/interfaces/evento";
import * as Cookies from "js-cookie";
import { EncryptService } from "src/app/servicios/encrypt.service";
import { isNullOrUndefined } from "util";
import { resolve } from 'url';

@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.css"],
})
export class EventListComponent implements OnInit {
  adminPrivileges = false;
  menuListado=true;
  eventos: Evento[];

  constructor(
    private eventosService: EventosService,
    private encrypt: EncryptService
  ) {}

  ngOnInit() {
    if (!isNullOrUndefined(Cookies.get("USER_ACCESS"))) {
      this.adminPrivileges =
        parseInt(this.encrypt.decrypt(Cookies.get("USER_ACCESS"))) == 1;
    }
    if(sessionStorage.getItem('reload') === "true"){
      sessionStorage.removeItem('reload');
      window.location.reload();
    }
    this.eventosService.getEventos().subscribe(
      data => {this.eventos = data;
        setTimeout(null, 900);
      }
    )

  }
}
