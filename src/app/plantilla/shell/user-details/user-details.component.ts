import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Usuario } from "src/app/interfaces/usuario";
import { UsuarioService } from "src/app/servicios/usuario.service";
import {Location } from "@angular/common";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
  usuario: Usuario;
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.usuarioService.getUsuario(id).subscribe(
      (data) => {
        this.usuario = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  volver(){
    this.location.back();
  }
}
