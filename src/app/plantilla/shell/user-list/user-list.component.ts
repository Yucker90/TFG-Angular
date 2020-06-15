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
    // Obtenemos todos los usuarios
    this.usuarios = this.usuariosService.getUsuarios();
    // Obtenemos de las cookies el acceso
    if(!isNullOrUndefined(Cookies.get("USER_ACCESS"))){
      this.adminPrivileges = parseInt(this.encrypt.decrypt(Cookies.get("USER_ACCESS")))== 1;
    }
  }

  // Según la opción elegida del desplegable, obtenemos los usuarios según un filtro u otro
  onChange(event) {
    if (event > 2) {
      this.usuarios = this.usuariosService.getUsuarios();
    } else {
      this.usuarios = this.usuariosService.getUsuarioByAccess(event);
    }
  }

  // Buscamos los usuarios según el string del parámetro
  buscar() {
    this.usuarios = this.usuariosService.getUsuariosByNombre(this.busqueda);
  }

  // Traducimos el acceso de un dígito a letras
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
