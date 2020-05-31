import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.css"],
})
export class ErrorComponent implements OnInit {
  tipoError: any;
  errorAut = false;

  constructor(private route: ActivatedRoute, private router: Location) {}

  ngOnInit() {
    this.tipoError = this.route.snapshot.paramMap.get("id");
    switch (this.tipoError) {
      case "459":
        this.errorEmail();
        break;
      case "460":
        this.errorLogin();
        break;
      case "461":
        this.errorTrabajo();
        break;
      case "462":
        this.errorEmailNotFound();
        break;
      case "404":
        this.errorNotFound();
        break;
      case "500":
        this.errorServer();
        break;
      case "403": case "401":
        this.errorAut = true;
        break;
      default:
        this.errorNotFound();
        break;
    }
  }
  errorTrabajo() {
    let text = document.createTextNode("Lo sentimos, ya se ha registrado en este evento");
    this.appendNode(text);
  }

  errorServer() {
    let text = document.createTextNode("Error en el servidor");
    this.appendNode(text);
  }

  errorEmailNotFound(){
    let text = document.createTextNode("No existe un usuario con ese email");
    this.appendNode(text);
  }

  errorEmail() {
    let text = document.createTextNode("Ya existe un usuario con ese email");
    this.appendNode(text);
  }

  errorLogin() {
    let text = document.createTextNode("Ya existe un usuario con ese login");
    this.appendNode(text);
    document.getElementById("btnVolver").toggleAttribute("routerLink", false);
    document.getElementById("btnVolver").setAttribute("routerLink","/userform");
  }

  errorNotFound() {
    let text = document.createTextNode("Lo siento, aquí no hay nada");
    this.appendNode(text);
  }

  appendNode(text: Text){
    document.getElementById("errorMensaje").appendChild(text);
  }
}
