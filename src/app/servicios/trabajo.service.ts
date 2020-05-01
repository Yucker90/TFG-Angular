import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trabajo } from '../interfaces/trabajo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrabajoService {

private trabajoURL="http://localhost:8080/api/v1/trabajos"

  constructor(private http: HttpClient) { }

  createTrabajo(trabajo: Trabajo){
    return this.http.post(`${this.trabajoURL}`, trabajo);
  }

  getTrabajoByUser(id: string):Observable<any> {
    return this.http.get(`${this.trabajoURL}/user/${id}`);
  }

  getTrabajoByEvento(id: string):Observable<any>{
    return this.http.get(`${this.trabajoURL}/event/${id}`);
  }
}
