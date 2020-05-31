import { Component, OnInit } from "@angular/core";
import { Rol } from "src/app/interfaces/rol";
import { RolService } from "src/app/servicios/rol.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-roldetails",
  templateUrl: "./roldetails.component.html",
  styleUrls: ["./roldetails.component.css"],
})
export class RoldetailsComponent implements OnInit {
  rol: Rol;
  idRol: string;
  menuModificar= false;
  menuBorrar= false;

  constructor(private rolService: RolService,private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.idRol = this.route.snapshot.paramMap.get("id");
    this.rolService.getRol(this.idRol).subscribe((data) => (this.rol = data));
  }

  showModificar(){
    this.menuModificar= true;

  }

  showDetalles(){
    if(this.menuModificar){
      this.menuModificar=false;
    }else if(this.menuBorrar){
      this.menuBorrar=false;
    }
  }

  showBorrar(){
    this.menuBorrar = true;
  }

  borrarRol(){
    this.rolService.deleteRol(this.idRol).subscribe(data => console.log(data), error => console.log(error));
    this.router.navigateByUrl('/rollist');
  }

  submit() {
    this.actualizarRol();
  }

  actualizarRol() {
    this.rolService.updateRol(this.idRol, this.rol).subscribe(data=>
      console.log(data),
      error => console.log(error));
    this.menuModificar=false;
  }

  submitBtn(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    this.submit();
    submitBtn.disabled = false;
  }
  
}
