import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { Usuario } from "src/app/interfaces/usuario";
import { Trabajo } from "src/app/interfaces/trabajo";
import { Observable } from "rxjs";
import { TrabajoService } from "src/app/servicios/trabajo.service";
import { Location } from "@angular/common";
import { isNullOrUndefined } from "util";
import * as Cookies from "js-cookie";
import { EncryptService } from "src/app/servicios/encrypt.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  constructor(
    private location: Location,
    private encrypt: EncryptService,
    private usuarioService: UsuarioService,
    private trabajoService: TrabajoService
  ) {}

  usuario: Usuario;
  trabajos: Observable<Trabajo[]>;
  detalles = true;
  adminPrivileges = false;

  ngOnInit() {
    // Obtenemos los privilegios del usuario (y si se ha logueado)
    if (!isNullOrUndefined(Cookies.get("USER_ACCESS"))) {
      this.adminPrivileges =
        parseInt(this.encrypt.decrypt(Cookies.get("USER_ACCESS"))) == 1;
    }

// Obtenemos el perfil del Usuario y sus trabajos
    this.usuarioService.getProfile().subscribe((data) => {
      this.usuario = data;
      this.trabajoService
        .getTrabajoByUser(this.usuario.id)
        .subscribe((datos) => (this.trabajos = datos));
    });
  
  }

  // Dependiendo del acceso (numérico), lo traducimos a un string
  getAcceso(acceso: number) {
    switch (acceso) {
      case 0:
        return "Deshabilitado";
      case 1:
        return "Administrador";
      case 2:
        return "Usuario";
    }
  }

  // Mostramos el menú de edición
  showModificar() {
    this.detalles = false;
  }


  // Mostramos el menú de detalles
  showDetalles() {
    this.detalles = true;
  }

  volver() {
    this.location.back();
  }

  // Llamamos al método de actualización del Usuario
  submit() {
    this.actualizarUsuario();
  }

  // Actualizamos el usuario
  actualizarUsuario() {
    this.usuario.apellidos = this.usuario.nombre.split(",")[0];
    this.usuario.password = this.encrypt.encrypt(this.usuario.password);
    this.usuarioService.putProfile(this.usuario);
    this.detalles = true;
  }

  submitBtn(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    this.submit();
    submitBtn.disabled = false;
  }
}
