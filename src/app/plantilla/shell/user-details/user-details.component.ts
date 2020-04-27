import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Usuario } from "src/app/interfaces/usuario";
import { UsuarioService } from "src/app/servicios/usuario.service";
import {Location } from "@angular/common";
import { TrabajoService } from 'src/app/servicios/trabajo.service';
import { Observable } from 'rxjs';
import { Trabajo } from 'src/app/interfaces/trabajo';
import * as Cookies from 'js-cookie';

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
  usuario: Usuario;
  trabajos: Observable<Trabajo[]>;
  detalles = true;
  adminPrivileges= parseInt(Cookies.get('USER_ACCESS'))==1;
  iduser: any;

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
      this.iduser = id;
    this.trabajoService.getTrabajoByUser(id).subscribe(
      data => this.trabajos = data);
      this.detalles= true;
  }

  volver(){
    this.location.back();
  }

  showModificar(){
    this.detalles= false;
  }

  showDetalles(){
    this.detalles= true;
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


  submit() {
    console.log("2");
    this.actualizarUsuario();
  }

  actualizarUsuario() {
    console.log("3");
    this.usuario.apellidos = this.usuario.nombre.split(',')[0];
    this.usuarioService.putUsuario(this.iduser, this.usuario);
    this.detalles= true;
  }

  submitBtn(submitBtn: HTMLButtonElement) {
    console.log("1");
    submitBtn.disabled = true;
    this.submit();
    submitBtn.disabled = false;
  }
}
