import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EmailService } from "src/app/servicios/email.service";
import { isUndefined } from 'util';

@Component({
  selector: "app-email-confirmation",
  templateUrl: "./email-confirmation.component.html",
  styleUrls: ["./email-confirmation.component.css"],
})
export class EmailConfirmationComponent implements OnInit {
  token: any;
  public tokenOk = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private emailService: EmailService,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.token = params["token"];
    });
    if (isUndefined(this.token) || this.token == "") {
      console.log("Token undefined");

    } else {
            this.emailService.comprobarToken(this.token);
            this.tokenOk = true;
    }
  }

  ngOnInit() {
   
    if (!isUndefined(this.token) || this.token !== "") {
      this.emailService.comprobarToken(this.token);
      this.tokenOk = true;
    } else this.tokenOk = false;
    
  }

  volver(){
    this.router.navigateByUrl("/");
  }
}
