import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EmailService } from "src/app/servicios/email.service";
import { isUndefined } from "util";

@Component({
  selector: "app-email-confirmation",
  templateUrl: "./email-confirmation.component.html",
  styleUrls: ["./email-confirmation.component.css"],
})
export class EmailConfirmationComponent implements OnInit {
  token= "";
  public tokenOk = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private emailService: EmailService,
    private router: Router
  ) {
  }

  // Recupero el token de confirmación de email y compruebo que es correcto
  ngOnInit() {
    this.token = "";
    this.activatedRoute.queryParams.subscribe((params) => {
      this.token = params["token"];
    });

    // Si es correcto, muestro un mensaje de confirmación, si no, 'token es nulo'
    if (!isUndefined(this.token) || this.token !== "") {
      console.log(this.token);
      this.emailService
        .comprobarToken(this.token)
        .subscribe(() => (this.tokenOk = true));
    } else this.tokenOk = false;
  }

  // Navega a la página principal
  volver() {
    this.router.navigateByUrl("/");
  }
}
