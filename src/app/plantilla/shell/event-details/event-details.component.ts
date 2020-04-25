import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EventosService } from "src/app/servicios/eventos.service";
import { Evento } from "src/app/interfaces/evento";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { RolService } from "src/app/servicios/rol.service";
import { TrabajoService } from "src/app/servicios/trabajo.service";
import { Trabajo } from "src/app/interfaces/trabajo";
import * as Cookies from "js-cookie";
import { Rol } from "src/app/interfaces/rol";
import { Observable } from "rxjs";

@Component({
  selector: "app-event-details",
  templateUrl: "./event-details.component.html",
  styleUrls: ["./event-details.component.css"],
})
export class EventDetailsComponent implements OnInit {
  evento: Evento;
  idEvento: string;
  horas: number;
  seleccionado: any;
  roles: Observable<Rol[]>;
  trabajos: Observable<Trabajo[]>;
  puestosOcupados: number;

  constructor(
    private route: ActivatedRoute,
    private eventosService: EventosService,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private trabajoService: TrabajoService
  ) {}

  ngOnInit() {
    this.idEvento = this.route.snapshot.paramMap.get("id");
    this.eventosService.getEvento(this.idEvento).subscribe(
      (data) => {
        this.evento = data;
        this.trabajoService
          .getTrabajoByEvento(this.idEvento)
          .subscribe((data) => {
            this.trabajos = data;
 
          });
      },
      (error) => {
        console.log(error);
      }
    );

    this.rolService.getRoles().subscribe((data) => (this.roles = data));
    /* if trabajadores.count >= necesarios{
        apuntarse.disabled
    }
    */

    console.log("Puestos ocupados: " + this.puestosOcupados);
  }

  apuntarse() {
    document.getElementById("formTrabajo").hidden = false;
  }

  solicitud() {
    let trabajo: Trabajo = new Trabajo();
    trabajo.evento = this.evento;
    this.usuarioService.getUsuario(Cookies.get("USER_ID")).subscribe((data) => {
      trabajo.usuario = data;
      this.rolService.getRol(this.seleccionado).subscribe((rol) => {
        console.log(rol);
        trabajo.rol = rol;
        trabajo.horas = this.horas;
        this.trabajoService
          .createTrabajo(trabajo)
          .subscribe((error) => console.log(error));
      });
      /*trabajo.horas = this.horas;
      this.trabajoService
        .createTrabajo(trabajo)
        .subscribe((error) => console.log(error));*/
    });
  }
}
