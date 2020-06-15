import { Component, OnInit } from "@angular/core";
import { Evento } from "src/app/interfaces/evento";
import { EventosService } from "src/app/servicios/eventos.service";
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: "app-event-form",
  templateUrl: "./event-form.component.html",
  styleUrls: ["./event-form.component.css"],
})
export class EventFormComponent implements OnInit {
  evento: Evento = new Evento();
  submitted = false; // Variable que nos permite controlar si se ha intentado enviar el evento (para validación)

  constructor(private eventoService: EventosService, private router: Router, private location: Location) {}

  ngOnInit() {}

  submit() {
    this.submitted = true;
    this.crearEvento();
  }

  submitBtn(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    this.submit();
    submitBtn.disabled = false;
  }

  crearEvento() {
    this.eventoService.createEvento(this.evento).subscribe(
      // Creo una variable en el storage para recargar la página (a veces no se cargan bien los datos y hay que recargar)
      (data) =>(sessionStorage.setItem('reload', 'true')),
      (error) => console.log(error)
    );
    this.location.back();
  }
}
