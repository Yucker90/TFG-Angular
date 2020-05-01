import { Component, OnInit } from "@angular/core";
import { EventosService } from "src/app/servicios/eventos.service";
import { Observable } from "rxjs";
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

  eventos: Observable<Evento[]>;

  constructor(
    private eventosService: EventosService,
    private encrypt: EncryptService
  ) {}

  ngOnInit() {
    if (!isNullOrUndefined(Cookies.get("USER_ACCESS"))) {
      let token= this.encrypt.decrypt(Cookies.get("USER_ACCESS"));
      console.log(token);

      this.adminPrivileges =
        parseInt(this.encrypt.decrypt(Cookies.get("USER_ACCESS"))) == 31;
      console.log(this.adminPrivileges);
    }
    this.eventos = this.eventosService.getEventos();
  }

  apuntarse(id: number) {
    console.log(id);
  }
}
