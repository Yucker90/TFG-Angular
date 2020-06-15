import { Component, OnInit } from "@angular/core";
import { EventosService } from "src/app/servicios/eventos.service";
import { Evento } from "src/app/interfaces/evento";
import * as Cookies from "js-cookie";
import { EncryptService } from "src/app/servicios/encrypt.service";
import { isNullOrUndefined } from "util";

@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.css"],
})
export class EventListComponent implements OnInit {
  adminPrivileges = false;
  menuListado = true;
  eventos: Evento[];

  constructor(
    private eventosService: EventosService,
    private encrypt: EncryptService
  ) {}

  ngOnInit() {
    // Obtenemos el acceso del Usuario desde las cookies, desencriptándolo
    if (!isNullOrUndefined(Cookies.get("USER_ACCESS"))) {
      this.adminPrivileges =
        parseInt(this.encrypt.decrypt(Cookies.get("USER_ACCESS"))) == 1;
    }

    // Si existe la variable en el storage, recargo la página y la elimino (si venimos desde el formulario de creación de eventos)
    if (sessionStorage.getItem("reload") === "true") {
      sessionStorage.removeItem("reload");
      window.location.reload();
    }

    // Obtenemos los eventos
    this.eventosService.getEventos().subscribe((data) => {
      this.eventos = data;
    });
  }
}
