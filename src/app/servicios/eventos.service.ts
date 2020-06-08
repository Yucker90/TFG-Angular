import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../interfaces/evento';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private baseURl = "https://api.josejoaquinmaglop.es/api/v1/eventos";
  
  constructor(private http: HttpClient) { }

  getEventos() {
    return this.http.get<any[]>(`${this.baseURl}`);
  }

  getEventosByUser(id: string){
    return this.http.get(`${this.baseURl}/${id}`);
  }

  createEvento(evento: Evento){
    return this.http.post(`${this.baseURl}`, evento);
  }

  getEvento(id: string):Observable<any>{
    return this.http.get(`${this.baseURl}/${id}`);
  }

  updateEvento(id: string, evento: Evento){
    return this.http.put(`${this.baseURl}/${id}`, evento);
  }
  
  deleteEvento(id: string): any{
    return this.http.delete(`${this.baseURl}/${id}`);
  }

  getNextEventos() {
    return this.http.get<any[]>(`${this.baseURl}/next`);
  }
}
