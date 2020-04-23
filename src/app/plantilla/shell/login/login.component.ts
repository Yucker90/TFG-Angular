import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { Router } from "@angular/router";
import * as Cookies from "js-cookie";
import { JsonPipe } from '@angular/common';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  userLogin: string;
  password: string;
  error: boolean = false;
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    if (Cookies.get("TOKEN_ID")) {
      this.router.navigateByUrl("/");
    }
  }

  login() {
    if (Cookies.get("TOKEN_ID")) {
      this.router.navigateByUrl("/");
    } else {
      console.log("login: " + this.userLogin);
      console.log("password: " + this.password);
      this.usuarioService.postLogin(this.userLogin, this.password).subscribe(
        (res) => {          
          this.setCookie(res);
          window.location.reload();
        },
        () => (this.error = true)
      );
    }
  }
  private setCookie(res) {
    Cookies.set("TOKEN_ID", res.idtoken);
    console.log(res.user);
    let user = JSON.parse(res.user);
    Cookies.set("USER_ID", user.id);
    Cookies.set("USER_ACCESS", user.acceso);   
  }
}
