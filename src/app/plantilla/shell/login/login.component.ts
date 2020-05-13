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
    if(!isNullOrUndefined(Cookies.get("RMBR"))){
      let cookie = this.encrypt.decrypt(Cookies.get("RMBR")).split('/');
      this.userLogin = cookie[0];
      this.password = cookie[1];
    }
    
    if (Cookies.get("TOKEN_ID")) {
      this.router.navigateByUrl("/");
    }
  }

  login() {
    if (Cookies.get("TOKEN_ID")) {
      this.router.navigateByUrl("/");
    } else {
      this.usuarioService.postLogin(this.userLogin, this.password).subscribe(
        (res) => {          
          this.setCookie(res);
          if(this.rememberMe){
            console.log(this.userLogin + " / " + this.password);
            Cookies.set("RMBR", this.encrypt.encrypt(this.userLogin+'/'+this.password));
          }
          window.location.reload();
        },
        () => (this.error = true)
      );
    }
  }
  private setCookie(res) {
    Cookies.set("TOKEN_ID", res.idtoken);
    let user = JSON.parse(res.user);
    Cookies.set("USER_ID", this.encrypt.encrypt(user.id));
    Cookies.set("USER_ACCESS", this.encrypt.encrypt(user.acceso));   
  }

  resetPassword(){
    alert("PASSWORD");
  }
}
