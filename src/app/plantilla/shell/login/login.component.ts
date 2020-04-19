import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userLogin: string;
  public password: string;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  login(){
    console.log("login: " + this.userLogin);
    console.log("password: "  + this.password);
    this.usuarioService.postLogin(this.userLogin, this.password);
     
    }

  }

