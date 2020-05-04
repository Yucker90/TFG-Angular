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
    if(!isNullOrUndefined(sessionStorage.getItem('reload'))){
      sessionStorage.setItem('reload', "true");
    }
    if (!isNullOrUndefined(Cookies.get("TOKEN_ID"))) {
      document.getElementById("logout").hidden = false;
      document.getElementById("login").hidden=true;
      document.getElementById("crearCuenta").hidden=true;
    }

    if(sessionStorage.getItem('reload') === "true"){
      sessionStorage.removeItem('reload');
      this.router.navigateByUrl('/login');
    }
  }

  logout(){
    Cookies.remove("USER_ACCESS");
    Cookies.remove("USER_ID");
    Cookies.remove("TOKEN_ID");
    sessionStorage.setItem('reload',"true");
    window.location.reload();
  }
}
