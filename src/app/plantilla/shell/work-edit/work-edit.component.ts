import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Trabajo } from "src/app/interfaces/trabajo";
import { TrabajoService } from "src/app/servicios/trabajo.service";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { Usuario } from "src/app/interfaces/usuario";
import { EventosService } from "src/app/servicios/eventos.service";
import { Evento } from "src/app/interfaces/evento";
import { RolService } from "src/app/servicios/rol.service";
import { Rol } from "src/app/interfaces/rol";
import {Location} from '@angular/common';

@Component({
  selector: "app-work-edit",
  templateUrl: "./work-edit.component.html",
  styleUrls: ["./work-edit.component.css"],
})
export class WorkEditComponent implements OnInit {
  idTrabajo: string;
  trabajo: Trabajo;
  users: Usuario[];
  eventos: Evento[];
  roles: Rol[];

  constructor(
    private eventoService: EventosService,
    private userService: UsuarioService,
    private route: ActivatedRoute,
    private trabajoService: TrabajoService,
    private rolService: RolService,
    private location: Location
  ) {}

  ngOnInit() {
    this.idTrabajo = this.route.snapshot.paramMap.get("id");
    this.trabajoService
      .getTrabajo(this.idTrabajo)
      .subscribe((data) => (this.trabajo = data));
    this.userService.getUsuarios().subscribe((data) => (this.users = data));
    this.eventoService.getEventos().subscribe((data) => (this.eventos = data));
    this.rolService.getRoles().subscribe((data) => (this.roles = data));
  }

  submit() {
    this.actualizarTrabajo();
  }

  actualizarTrabajo() {
    this.trabajoService
      .updateTrabajo(this.idTrabajo, this.trabajo)
      .subscribe((data) => console.log(data));
  this.location.back();    
  }

  submitBtn(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    this.submit();
    submitBtn.disabled = false;
  }


}
