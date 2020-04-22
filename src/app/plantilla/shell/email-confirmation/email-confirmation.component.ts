import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
    private emailService: EmailService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.token = params["token"];
      console.log("1");
      console.log("TokenOk (constructor): " + this.tokenOk);
    });
    if (isUndefined(this.token) || this.token == "") {
      console.log("Token undefined");

    } else {
            this.emailService.comprobarToken(this.token);
            this.tokenOk = true;
    }
  }

  ngOnInit() {
    /*
    if (this.token != undefined || this.token != "") {
      //this.emailService.comprobarToken(this.token);
      this.tokenOk = true;
      console.log("TokenOk (onInit): " + this.tokenOk);
      console.log("2");
      console.log(this.token);
    } else this.tokenOk = false;
    
  }*/
  }
}
