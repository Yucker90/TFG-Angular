import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  usuario: Usuario = {nombre:"", apellidos: "", email:"", login:"", password:""};
  ;
  submitted = false;

  constructor(private usuarioService: UsuarioService, private router: Router, private location: Location) { }

  ngOnInit() {
  }

  submit(){
    this.submitted = true;
    this.crearUsuario();
  }

  crearUsuario(){
    this.usuarioService.crearUsuario(this.usuario).subscribe(data => console.log(data), error => console.log(error));
    this.usuario = {nombre:"", apellidos: "", email:"", login:"", password:""};
    this.volver();
    document.getElementById("formulario").hidden=true;
  }

  volver(){
    this.location.back();
  }


}
