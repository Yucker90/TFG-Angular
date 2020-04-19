import { Injectable } from "@angular/core";
import { Usuario } from "../interfaces/usuario";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import * as Cookies from "js-cookie";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  private baseURl = "http://localhost:8080/api/v1/usuarios";
  private loginURL = "http://localhost:8080/api/v1/auth";
  private registerURL = "http://localhost:8080/api/v1/register";

  constructor(private http: HttpClient, private router: Router) {}

  crearUsuario(usuario: Usuario) {
    usuario.nombre = usuario.apellidos + ", " + usuario.nombre;
    return this.http.post(`${this.registerURL}`, usuario);
  }

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.baseURl}`);
  }

  getUsuario(id: string): Observable<any> {
    console.log("ID a buscar: " + id)
    return this.http.get(`${this.baseURl}/${id}`);
  }
  

  postLogin(username: string, password: string) {
    // Con localstorage
    //return this.http.post(`${this.loginURL}`, {username, password}).subscribe(res => this.setSession(res));

    return this.http
      .post(`${this.loginURL}`, { username, password })
      .subscribe((res) => {
        this.setCookie(res);
        //this.setSession(res);    
        this.router.navigateByUrl('/');
      });
  }
  private setCookie(res) {
    Cookies.set("TOKEN_ID", res.idtoken);
  }

  private setSession(auth) {
    console.log(auth);
    localStorage.setItem("id_token", auth.idtoken);
  }

}


