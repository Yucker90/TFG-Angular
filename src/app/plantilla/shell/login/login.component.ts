import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { Router } from "@angular/router";
import * as Cookies from "js-cookie";
import { EncryptService } from 'src/app/servicios/encrypt.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  userLogin: string;
  password: string;
  error: boolean = false;
  rememberMe: boolean = false;
  constructor(private usuarioService: UsuarioService, private router: Router, private encrypt: EncryptService) {}

  ngOnInit() {
    // Si hemos marcado la casilla de "Recordar contraseña", los datos estarán en las cookies
    if(!isNullOrUndefined(Cookies.get("RMBR"))){
      let cookie = this.encrypt.decrypt(Cookies.get("RMBR")).split('/');
      this.userLogin = cookie[0];
      this.password = cookie[1];
    }
    
    // Si ya nos hemos logueado, no necesitamos entrar aquí
    if (Cookies.get("TOKEN_ID")) {
      this.router.navigateByUrl("/");
    }
  }

  login() {
   
    // Si no hemos obtenido las credenciales de las cookies, encriptamos la contraseña
      if(isNullOrUndefined(Cookies.get("RMBR"))){
        this.password = this.encrypt.encrypt(this.password);
      }

      // Intentamos loguearnos
      this.usuarioService.postLogin(this.userLogin, this.password).subscribe(
        (res) => {
          // Si nos hemos logueado con éxito, guardamos los datos en las cookies        
          this.setCookie(res);
          // Si hemos marcado la casilla de "Recordar contraseña", la guardamos en la cookie
          if(this.rememberMe){
            Cookies.set("RMBR", this.encrypt.encrypt(this.userLogin+'/'+this.password));
          }else{
          // Si no, borramos la cookie por motivos de seguridad
            Cookies.remove("RMBR");
          }
          window.location.reload();
        },
        // Si hemos obtenido un error, mostramos un mensaje
        () => (this.error = true)
      );
  }
  private setCookie(res) {
    // Guardamos el JWT
    Cookies.set("TOKEN_ID", res.idtoken);
    let user = JSON.parse(res.user);
    // Guardamos el ID y el Acceso del usuario
    Cookies.set("USER_ID", this.encrypt.encrypt(user.id));
    Cookies.set("USER_ACCESS", this.encrypt.encrypt(user.acceso));   
  }
}
