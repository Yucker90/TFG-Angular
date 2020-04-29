import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/interfaces/usuario";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"],
})
export class UserFormComponent implements OnInit {
  usuario: Usuario = new Usuario();
  submitted = false;
  matchPasswordVar: string;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {}

  submit() {
    this.submitted = true;
    this.crearUsuario();
  }

  crearUsuario() {
    this.usuarioService.crearUsuario(this.usuario);
    document.getElementById("form").hidden = true;
  }

  volver() {
    this.location.back();
  }

  submitBtn(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    this.submit();
    submitBtn.disabled = false;
  }
}
