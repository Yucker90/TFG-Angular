import { Component, OnInit } from "@angular/core";
import { RolService } from "src/app/servicios/rol.service";
import { Observable } from "rxjs";
import { Rol } from "src/app/interfaces/rol";
import { Location } from '@angular/common';

@Component({
  selector: "app-rol-list",
  templateUrl: "./rol-list.component.html",
  styleUrls: ["./rol-list.component.css"],
})
export class RolListComponent implements OnInit {
  roles: Observable<Rol[]>;

  constructor(private rolService: RolService, private route: Location) {}

  ngOnInit() {
   this.roles = this.rolService.getRoles();
  }

  volver(){
    this.route.back();
  }
}
