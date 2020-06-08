import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Trabajo } from "../interfaces/trabajo";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TrabajoService {
  private trabajoURL = "https://api.josejoaquinmaglop.es/api/v1/trabajos";

  constructor(private http: HttpClient) {}

  createTrabajo(trabajo: Trabajo) {
    return this.http.post(`${this.trabajoURL}`, trabajo);
  }

  getTrabajoByUser(id: string): Observable<any> {
    return this.http.get(`${this.trabajoURL}/user/${id}`);
  }

  getTrabajoByEvento(id: string) {
    return this.http.get<any[]>(`${this.trabajoURL}/event/${id}`);
  }

  getTrabajo(id: string): Observable<any> {
    return this.http.get(`${this.trabajoURL}/${id}`);
  }

  updateTrabajo(idTrabajo: string, trabajo: Trabajo) {
    return this.http.put(`${this.trabajoURL}/${idTrabajo}`, trabajo);
  }

  deleteTrabajo(id: string) {
    return this.http.delete(`${this.trabajoURL}/${id}`);
  }
}
