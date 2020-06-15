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
  userPrivileges = false;

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
    // Tomamos el parámetro id de la URL
    this.idEvento = this.route.snapshot.paramMap.get("id");
    // Obtenemos el evento desde el backend
    this.eventosService.getEvento(this.idEvento).subscribe(
      (data) => {
        this.evento = data;
        // Obtenemos todos los trabajos de ese evento
        this.trabajoService
          .getTrabajoByEvento(this.idEvento)
          .subscribe((datos) => (this.trabajos = datos));
      },
      (error) => {
        console.log(error);
      }
    );
    // Obtenemos de las cookies la llamada 'User_access' que nos indica el acceso
    if (!isNullOrUndefined(Cookies.get("USER_ACCESS"))) {
      // La desencriptamos y comprobamos el acceso del usuario para mostrar más o menos información
      let access = parseInt(this.encrypt.decrypt(Cookies.get("USER_ACCESS")));
      this.adminPrivileges = access == 1;
      this.userPrivileges = access > 0;
    }
    // Obtenemos todos los roles
    this.rolService.getRoles().subscribe((data) => (this.roles = data));
  }

  // Si el usuario ha pulsado el botón de "Quiero ir", le mostramos el formulario
  apuntarse() {
    document.getElementById("formTrabajo").hidden = false;
  }

  // Enviamos la información (qué Evento, qué Usuario, en qué Rol, cuantas Horas)
  solicitud() {
    let trabajo: Trabajo = new Trabajo();
    trabajo.evento = this.evento;
    this.usuarioService.getProfile().subscribe((data) => {
      trabajo.usuario = data;
      this.rolService.getRol(this.seleccionado).subscribe((rol) => {
        trabajo.rol = rol;
        trabajo.horas = this.horas;
        this.trabajoService
          .createTrabajo(trabajo)
          .subscribe((error) => console.log(error));
        // Recargamos la página para volver a la página por defecto
        window.location.reload();
      });
    });
  }

  // Mostramos los detalles del evento
  showModificar() {
    this.detalles = false;
  }

  // Mostramos el menú de borrado
  showBorrar() {
    this.menuDetalles = false;
  }

  // Llamamos al método para actualizar un evento
  submit() {
    this.actualizarEvento();
  }

  actualizarEvento() {
    this.eventosService.updateEvento(this.idEvento, this.evento);
  }


  // Método auxiliar para poder pulsar varias veces el botón de enviar
  submitBtn(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    this.submit();
    submitBtn.disabled = false;
  }

  // Método para borrar un evento. Cuando se ejecute, se navega hasta la página de listado
  borrarEvento() {
    this.eventosService.deleteEvento(this.idEvento).subscribe(
      (data) => data,
      (error) => console.log(error)
    );
    this.router.navigateByUrl("/eventlist");
  }

  // Ocultamos el menú de detalle
  cancelar() {
    this.menuDetalles = true;
  }

  // Navegamos al menú de edición de trabajo
  modificarTrabajo(id: string) {
    this.router.navigateByUrl("/workedit/" + id);
  }

  // Mostramos el menú de borrar trabajo
  // Recorremos el listado de trabajos y nos quedamos el que tenga esa id
  // He obtado por esto para evitar una llamada casi innecesaria a la base de datos
  showMenuBorrarTrabajo(id: string) {
    this.varBorrarTrabajo = true;
    this.trabajos.forEach((element) => {
      if (element.id === id) {
        this.trabajo = element;
      }
    });
  }

  // Borramos el trabajo que hemos seleccionado
  borrarTrabajo(id: string) {
    this.trabajoService.deleteTrabajo(id).subscribe(
      (data) => console.log("Trabajo borrado"),
      (error) => console.log(error)
    );
    this.cancelarBorrarTrabajo();
  }

  // Cambiamos la variable de borrado de trabajo (permite ver el menú de borrado) y recargamos la página
  cancelarBorrarTrabajo() {
    this.varBorrarTrabajo = false;
    window.location.reload();
  }
}
