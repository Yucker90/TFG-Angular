import { Component, OnInit } from "@angular/core";
import { Evento } from "src/app/interfaces/evento";
import { EventosService } from "src/app/servicios/eventos.service";

@Component({
  selector: "app-event-form",
  templateUrl: "./event-form.component.html",
  styleUrls: ["./event-form.component.css"],
})
export class EventFormComponent implements OnInit {
  evento: Evento = new Evento();
  submitted = false;

  constructor(private eventoService: EventosService) {}

  ngOnInit() {}

  submit() {
    console.log(2);
    this.submitted = true;
    this.crearEvento();
  }

  submitBtn(submitBtn: HTMLButtonElement) {
    console.log(1);
    submitBtn.disabled = true;
    this.submit();
    submitBtn.disabled = false;
  }

  crearEvento() {
    console.log(3);
    this.eventoService.createEvento(this.evento).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
  }
}
