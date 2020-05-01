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
  constructor(private router: Router) {}

  ngOnInit() {
    if (!isNullOrUndefined(Cookies.get("TOKEN_ID"))) {
      document.getElementById("logout").hidden = false;
      document.getElementById("login").hidden=true;
      document.getElementById("crearCuenta").hidden=true;
    }else{
      this.router.navigateByUrl('/login');
    }
  }

  logout(){
    Cookies.remove("USER_ACCESS");
    Cookies.remove("USER_ID");
    Cookies.remove("TOKEN_ID");
    window.location.reload();
  }
}
