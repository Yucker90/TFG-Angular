import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario } from "src/app/interfaces/usuario";
import { UsuarioService } from "src/app/servicios/usuario.service";
import {Location, getLocaleDateFormat } from "@angular/common";
import { TrabajoService } from 'src/app/servicios/trabajo.service';
import { Observable } from 'rxjs';
import { Trabajo } from 'src/app/interfaces/trabajo';
import * as Cookies from 'js-cookie';
import { EncryptService } from 'src/app/servicios/encrypt.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
  usuario: Usuario;
  trabajos: Observable<Trabajo[]>;
  detalles = true;
  adminPrivileges= false;
  iduser: any;
  menuDetalles= true;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private trabajoService: TrabajoService,
    private encrypt: EncryptService,
    private router: Router
  ) {}

  
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    if (!isNullOrUndefined(Cookies.get("USER_ACCESS"))) {
   this.adminPrivileges = parseInt(this.encrypt.decrypt(Cookies.get('USER_ACCESS')))== 1;
    this.usuarioService.getUsuario(id).subscribe(
      (data) => {
        this.usuario = data;
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(id);
      this.iduser = id;

    this.trabajoService.getTrabajoByUser(id).subscribe(
      data => this.trabajos = data);
      this.detalles= true;
    }else{
      this.router.navigateByUrl('/error/403');
    }
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
    this.actualizarUsuario();
  }

  actualizarUsuario() {
    this.usuario.apellidos = this.usuario.nombre.split(',')[0];
    this.usuario.password = this.encrypt.encrypt(this.usuario.password);
    this.usuarioService.putUsuario(this.iduser, this.usuario);
    this.detalles= true;
  }

  submitBtn(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    this.submit();
    submitBtn.disabled = false;
  }

  borrarUsuario(){
    this.menuDetalles= false;
  }

  cancelar(){
    this.menuDetalles= true;
  }

  borrar(){
    console.log("Usuario a borrar: " + this.iduser);
    this.usuarioService.delete(this.iduser).subscribe((data) =>{
      console.log(data);
      //let body = JSON.parse(data);
      //console.log(body.get("Borrado"));
    });
    this.router.navigateByUrl('/userlist');
  }

  enviarPDF(){
    alert("EN DESARROLLO");
  }

}
