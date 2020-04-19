import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  usuario:Usuario;
  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService) {

  }
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.usuarioService.getUsuario(id).subscribe(
      data => {
        this.usuario = data;
      }
    )
  }

}