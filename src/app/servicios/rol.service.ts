import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../interfaces/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private rolesURL = 'http://localhost:8080/api/v1/roles';

  constructor(private http: HttpClient) { }

  getRoles(): Observable<any>{
    return this.http.get(`${this.rolesURL}`);
  }

  crearRol(rol: Rol){
    return this.http.post(`${this.rolesURL}`, rol);
  }

  getRol(id: string): Observable<any>{
    return this.http.get(`${this.rolesURL}/${id}`);
  }

}