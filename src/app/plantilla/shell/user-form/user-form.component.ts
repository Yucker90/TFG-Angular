import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/interfaces/usuario";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";

function matchPassword(arg0: string) {
  return (control: AbstractControl): { [s: string]: boolean } => {
    if (control.parent) {
      const check = control.parent.controls[arg0].value;
      if (control.value !== check) {
        return {
          match: true,
        };
      }
    }
    return null;
  };
}


@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"],
})
export class UserFormComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  submitted = false;
  public matchPasswordVar: string;
  formulario: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private location: Location
  ) {
    this.formulario = new FormGroup({
      nombre: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      apellidos: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
      ]),
      movil: new FormControl("", [
        Validators.required,
        Validators.maxLength(9),
      ]),
      login: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
      ]),
      password: new FormControl("", [Validators.required]),
      matchPaswordVar: new FormControl("", [
        Validators.required,
        matchPassword('password')
      ]),
    });
  }

  

  // Test
  submitTest() {
    console.log(this.formulario.value);
    console.log(this.formulario);
  }

  ngOnInit() {}

  submit() {
    this.submitted = true;
    this.crearUsuario();
  }

  crearUsuario() {
    //this.usuarioService.crearUsuario(this.usuario).subscribe(data => console.log(data), error => console.log(error));
    console.log(this.usuario);
    document.getElementById("form").hidden = true;
  }

  volver() {
    this.location.back();
  }
}
