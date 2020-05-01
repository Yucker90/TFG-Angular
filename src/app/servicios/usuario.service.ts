import { Injectable } from "@angular/core";
import { Usuario } from "../interfaces/usuario";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { ErrorService } from "./error.service";
import * as Cookies from 'js-cookie';

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  private baseURl = "http://localhost:8080/api/v1/usuarios";
  private loginURL = "http://localhost:8080/api/v1/auth";
  private registerURL = "http://localhost:8080/api/v1/register";
  private accessURL = "http://localhost:8080/api/v1/access";
  private stringUrl = "http://localhost:8080/api/v1/string";

  constructor(private http: HttpClient, private error: ErrorService) {}

  crearUsuario(usuario: Usuario) {
    usuario.nombre = usuario.apellidos + ", " + usuario.nombre;
    //return this.http.post(`${this.registerURL}`, usuario);

    return this.http.post(`${this.registerURL}`, usuario);
  }

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.baseURl}`);
  }

  putUsuario(userid: string, user: Usuario) {
    return this.http
      .put(`${this.baseURl}/${userid}`, user)
      .subscribe((data) => console.log(data));
  }

  getUsuario(id: string): Observable<any> {
    return this.http.get(`${this.baseURl}/${id}`);
  }

  getUsuarioByAccess(access: number): Observable<any> {
    return this.http.get(`${this.accessURL}/${access}`);
  }

  delete(usuarioId: number){
    console.log("Usuario a borrar (servicio): " + usuarioId);
    return this.http.delete(`${this.baseURl}/${usuarioId}`);
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

  logoutForzoso(){
    Cookies.remove("USER_ID");
    Cookies.remove("USER_ACCESS");
    Cookies.remove("TOKEN_ID");
    
  }
}
