import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { Usuario } from "src/app/interfaces/usuario";
import { Observable } from "rxjs";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  usuarios: Observable<Usuario[]>;
  usuarioSelected = null;
  public busqueda: string;

  constructor(private usuariosService: UsuarioService) {}

  ngOnInit() {
    this.usuarios = this.usuariosService.getUsuarios();
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
}
