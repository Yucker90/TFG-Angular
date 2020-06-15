import { Component, OnInit } from "@angular/core";
import * as Cookies from "js-cookie";
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  reload;
  constructor(private router: Router) {}

  ngOnInit() {
    // Si hemos guardado una variable en las sessionStorage, la ponemos a true
    if(!isNullOrUndefined(sessionStorage.getItem('reload'))){
      sessionStorage.setItem('reload', "true");
    }

    // Si nos hemos logueado, ocultamos "Crear cuenta" y "Login" y mostramos "Logout" y "Perfil"
    if (!isNullOrUndefined(Cookies.get("TOKEN_ID"))) {
      document.getElementById("perfil").hidden= false;
      document.getElementById("logout").hidden = false;
      document.getElementById("login").hidden=true;
      document.getElementById("crearCuenta").hidden=true;
    }

    // Si tenemos en el sessionStorage 'reload', la borramos y recargamos la página, así controlamos bucles de recarga infinitos
    if(sessionStorage.getItem('reload') === "true"){
      sessionStorage.removeItem('reload');
      this.router.navigateByUrl('/login');
    }
  }

  // Al cerrar sesión, borramos el Acceso del Usuario, el ID, el JWT y guardamos 'reload' en el sessionStorage
  logout(){
    Cookies.remove("USER_ACCESS");
    Cookies.remove("USER_ID");
    Cookies.remove("TOKEN_ID");
    sessionStorage.setItem('reload',"true");
    window.location.reload();
  }
}
