import { Injectable } from "@angular/core";
import { Usuario } from "../interfaces/usuario";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  private baseURl = "http://localhost:8080/api/v1/usuarios";
  private loginURL = "http://localhost:8080/api/v1/auth";
  private registerURL = "http://localhost:8080/api/v1/register";
  private rolesURL = "http://localhost:8080/api/v1/roles";
  private stringUrl = "http://localhost:8080/api/v1/string";

  constructor(
    private http: HttpClient
  ) {}

  crearUsuario(usuario: Usuario) {
    usuario.nombre = usuario.apellidos + ", " + usuario.nombre;
    return this.http.post(`${this.registerURL}`, usuario);
  }

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.baseURl}`);
  }

  getUsuario(id: string): Observable<any> {
    console.log("ID a buscar: " + id);
    return this.http.get(`${this.baseURl}/${id}`);
  }

  getUsuarioByAccess(access: number): Observable<any>{
    return this.http.get(`${this.rolesURL}/${access}`)
  }

  postLogin(username: string, password: string) {
    return this.http.post(`${this.loginURL}`, { username, password });
  }

  getRoles(){
    return this.http.get(`${this.rolesURL}`);
  }

  getUsuariosByNombre(string: string): Observable<any>{
    return this.http.get(`${this.stringUrl}/${string}`);
  }
}
