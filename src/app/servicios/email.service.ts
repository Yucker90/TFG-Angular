import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmailService {
  
  private baseURl = 'http://localhost:8080/api/v1/confirm-account';
  constructor(private http: HttpClient) { }

  comprobarToken(token: any) {
    console.log("Servicio comprobarToken")
    return this.http.get(`${this.baseURl}/${token}`);
  }
}
