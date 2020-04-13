import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  

  constructor() { }

  comprobarToken(token: any) {
    console.log("El token es: " + token);
    return token==="token";

  }
}
