import { Injectable } from "@angular/core";
import { Usuario } from "../interfaces/usuario";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { ErrorService } from "./error.service";
import * as Cookies from "js-cookie";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  
  private baseURl = "https://api.josejoaquinmaglop.es/api/v1/usuarios";
  private loginURL = "https://api.josejoaquinmaglop.es/api/v1/auth";
  private registerURL = "https://api.josejoaquinmaglop.es/api/v1/register";
  private accessURL = "https://api.josejoaquinmaglop.es/api/v1/access";
  private stringUrl = "https://api.josejoaquinmaglop.es/api/v1/string";
  private profileUrl = "https://api.josejoaquinmaglop.es/api/v1/profile";

  constructor(private http: HttpClient, private error: ErrorService) {}

  crearUsuario(usuario: Usuario) {
    usuario.nombre = usuario.apellidos + ", " + usuario.nombre;
    return this.http.post(`${this.registerURL}`, usuario);
  }

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.baseURl}`);
  }

  putUsuario(userid: string, user: Usuario) {
    return this.http.put(`${this.baseURl}/${userid}`, user);
  }

  getUsuario(id: string): Observable<any> {
    return this.http.get(`${this.baseURl}/${id}`);
  }

  delete(usuarioId: number) {
    return this.http.delete(`${this.baseURl}/${usuarioId}`);
  }

  getUsuarioByAccess(access: number): Observable<any> {
    return this.http.get(`${this.accessURL}/${access}`);
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.profileUrl}`);
  }

  putProfile(usuario: Usuario) {
    return this.http.put(`${this.profileUrl}`, usuario);
  }

  postLogin(username: string, password: string) {
    return this.http.post(`${this.loginURL}`, { username, password });
  }

  getRoles() {
    return this.http.get(`${this.accessURL}`);
  }

  getUsuariosByNombre(string: string): Observable<any> {
    return this.http.get(`${this.stringUrl}/${string}`);
  }

  logoutForzoso() {
    Cookies.remove("USER_ID");
    Cookies.remove("USER_ACCESS");
    Cookies.remove("TOKEN_ID");
  }
}
