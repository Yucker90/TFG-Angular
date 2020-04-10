import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  usuarios : Observable<Usuario[]>;
  usuarioSelected = null;
  public busqueda:string;

  constructor(private usuariosService: UsuarioService) { }

  ngOnInit() {
    this.usuariosService.getUsuarios();
  }

  onChange(event){
    console.log(event);
  }

  buscar(){
    console.log(this.busqueda);
  }

}
