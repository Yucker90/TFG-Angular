import { Component, OnInit } from "@angular/core";
import { Rol } from "src/app/interfaces/rol";
import { RolService } from "src/app/servicios/rol.service";
import {Location } from '@angular/common'

@Component({
  selector: "app-rol-form",
  templateUrl: "./rol-form.component.html",
  styleUrls: ["./rol-form.component.css"],
})
export class RolFormComponent implements OnInit {
  rol: Rol = new Rol();
  submitted = false;

  constructor(private rolService: RolService, private location: Location) {}

  ngOnInit() {}

  submit() {
    this.crearRol();
  }

  submitBtn(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    this.submit();
    submitBtn.disabled = false;
  }

  crearRol() {
    this.rolService.crearRol(this.rol).subscribe((error) => console.log(error));
    window.location.reload();
  }

  volver(){
    this.location.back();
  }
}
