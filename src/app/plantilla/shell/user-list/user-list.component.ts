import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { Usuario } from "src/app/interfaces/usuario";
import { Observable } from "rxjs";
import { EncryptService } from 'src/app/servicios/encrypt.service';
import { isNullOrUndefined } from 'util';
import * as Cookies from 'js-cookie';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  usuarios: Observable<Usuario[]>;
  usuarioSelected = null;
  public busqueda: string;
  adminPrivileges = false;

  constructor(private usuariosService: UsuarioService, private encrypt: EncryptService) {}

  ngOnInit() {
    this.usuarios = this.usuariosService.getUsuarios();
    if(!isNullOrUndefined(Cookies.get("USER_ACCESS"))){
      this.adminPrivileges = parseInt(this.encrypt.decrypt(Cookies.get("USER_ACCESS")))== 31;
    }
  }

  onChange(event) {
    if (event > 2) {
      this.usuarios = this.usuariosService.getUsuarios();
    } else {
      this.usuarios = this.usuariosService.getUsuarioByAccess(event);
    }
  }

  buscar() {
    this.usuarios = this.usuariosService.getUsuariosByNombre(this.busqueda);
  }

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
}
