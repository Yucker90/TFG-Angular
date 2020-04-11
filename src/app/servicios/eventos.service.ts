import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private baseURl = 'http://localhost:8080/api/v1/eventos';
  
  constructor(private http: HttpClient) { }

  getEventos(): Observable<any>{
    return this.http.get(`${this.baseURl}`);
  }

  getEventosByUser(id: string){
    return this.http.get(`${this.baseURl}/${id}`);
  }

  
}
