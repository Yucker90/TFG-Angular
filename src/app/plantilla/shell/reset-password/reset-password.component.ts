import { Component, OnInit } from '@angular/core';
import { ResetPass } from 'src/app/servicios/resetpass.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
 email: string = "";
 submitted: boolean;
 emailEnviadoOk = false;
  constructor(private resetService: ResetPass) { }

  ngOnInit() {
  }

  submit(){
// Enviamos el email para la petición de reestablecimiento de la contraseña
     this.resetService.resetPassword(this.email).subscribe(
      () => {
        this.emailEnviadoOk = true;
      }
    ) 
  }

  submitBtn(submitBtn: HTMLButtonElement){

  }
}
