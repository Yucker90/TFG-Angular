import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseURl = 'http://localhost:8080/api/v1/usuarios';

  constructor(private http: HttpClient) { }

  crearUsuario(usuario: Usuario) {
    return this.http.post(`${this.baseURl}`, usuario);
  }
}
