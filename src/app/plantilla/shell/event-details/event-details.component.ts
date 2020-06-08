import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventosService } from "src/app/servicios/eventos.service";
import { Evento } from "src/app/interfaces/evento";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { RolService } from "src/app/servicios/rol.service";
import { TrabajoService } from "src/app/servicios/trabajo.service";
import { Trabajo } from "src/app/interfaces/trabajo";
import * as Cookies from "js-cookie";
import { Rol } from "src/app/interfaces/rol";
import { Observable } from "rxjs";
import { EncryptService } from "src/app/servicios/encrypt.service";
import { isNullOrUndefined } from "util";

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
  trabajos: Trabajo[];
  puestosOcupados: number;
  detalles = true;
  menuDetalles = true;
  adminPrivileges = false;
  idTrabajo: string;
  varBorrarTrabajo = false;
  trabajo: Trabajo;
  userPrivileges= false;

  constructor(
    private route: ActivatedRoute,
    private eventosService: EventosService,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private trabajoService: TrabajoService,
    private encrypt: EncryptService,
    private router: Router
  ) {}

  ngOnInit() {
    this.idEvento = this.route.snapshot.paramMap.get("id");
    this.eventosService.getEvento(this.idEvento).subscribe(
      (data) => {
        this.evento = data;
        this.trabajoService
          .getTrabajoByEvento(this.idEvento)
          .subscribe((data) => (this.trabajos = data));
      },
      (error) => {
        console.log(error);
      }
    );
    if (!isNullOrUndefined(Cookies.get("USER_ACCESS"))) {
      let access = parseInt(this.encrypt.decrypt(Cookies.get("USER_ACCESS")));
      this.adminPrivileges = access == 1;
      this.userPrivileges = access > 0;
    }
    this.rolService.getRoles().subscribe((data) => (this.roles = data));
  }

  apuntarse() {
    document.getElementById("formTrabajo").hidden = false;
  }

  solicitud() {
    let trabajo: Trabajo = new Trabajo();
    trabajo.evento = this.evento;
/*     let id = parseInt(this.encrypt.decrypt(Cookies.get("USER_ID")));
 */    this.usuarioService.getProfile().subscribe((data) => {
      trabajo.usuario = data;
      this.rolService.getRol(this.seleccionado).subscribe((rol) => {
        trabajo.rol = rol;
        trabajo.horas = this.horas;
        this.trabajoService
          .createTrabajo(trabajo)
          .subscribe((error) => console.log(error));
        window.location.reload();
      });
      /*trabajo.horas = this.horas;
      this.trabajoService
        .createTrabajo(trabajo)
        .subscribe((error) => console.log(error));*/
    });
  }

  showModificar() {
    this.detalles = false;
  }

  showBorrar() {
    this.menuDetalles = false;
  }

  submit() {
    this.actualizarEvento();
  }

  actualizarEvento() {
    this.eventosService
      .updateEvento(this.idEvento, this.evento)
      .subscribe((data) => console.log(data));
  }

  submitBtn(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    this.submit();
    submitBtn.disabled = false;
  }

  borrarEvento() {
    this.eventosService.deleteEvento(this.idEvento).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.router.navigateByUrl("/eventlist");
  }

  cancelar() {
    this.menuDetalles = true;
  }

  modificarTrabajo(id: string) {
    this.router.navigateByUrl("/workedit/" + id);
  }

  showMenuBorrarTrabajo(id: string) {
    this.varBorrarTrabajo = true;
    this.trabajos.forEach((element) => {
      if (element.id === id) {
        this.trabajo = element;
      }
    });
  }

  borrarTrabajo(id: string) {
    this.trabajoService.deleteTrabajo(id).subscribe(
      (data) => console.log("Trabajo borrado:" + data),
      (error) => console.log(error)
    );
    this.cancelarBorrarTrabajo();
  }

  cancelarBorrarTrabajo() {
    this.varBorrarTrabajo = false;
    window.location.reload();
  }
}
