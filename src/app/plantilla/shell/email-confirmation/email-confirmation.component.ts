import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from 'src/app/servicios/email.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {

  token: any;
  tokenOk = false;

  constructor(private activatedRoute: ActivatedRoute, private emailService: EmailService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
  });
   }

  ngOnInit() {
    if(this.emailService.comprobarToken(this.token)){
      this.tokenOk = true;
    }

  }

}
