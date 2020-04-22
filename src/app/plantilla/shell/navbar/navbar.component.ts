import { Component, OnInit } from "@angular/core";
import * as Cookies from "js-cookie";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    if (Cookies.get("TOKEN_ID")) {
      document.getElementById("logout").hidden = false;
      document.getElementById("login").hidden=true;
      document.getElementById("crearCuenta").hidden=true;
    }
  }

  logout(){
    Cookies.remove("TOKEN_ID");
    window.location.reload();
  }
}
