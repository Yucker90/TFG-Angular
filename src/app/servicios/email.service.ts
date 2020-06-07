import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmailService {
  
  private emailURl = 'http://127.0.0.1:8080/fenixapp/api/v1/confirm-account';
  constructor(private http: HttpClient) { }

  comprobarToken(token: string) {
    return this.http.get(`${this.emailURl}/${token}`);
  }
}
