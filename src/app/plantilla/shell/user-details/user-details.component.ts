import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Usuario } from "src/app/interfaces/usuario";
import { UsuarioService } from "src/app/servicios/usuario.service";
import {Location } from "@angular/common";
import { TrabajoService } from 'src/app/servicios/trabajo.service';
import { Observable } from 'rxjs';
import { Trabajo } from 'src/app/interfaces/trabajo';

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
  usuario: Usuario;
  trabajos: Observable<Trabajo[]>;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private trabajoService: TrabajoService
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

    this.trabajoService.getTrabajoByUser(id).subscribe(
      data => this.trabajos = data);
  }

  volver(){
    this.location.back();
  }
}
