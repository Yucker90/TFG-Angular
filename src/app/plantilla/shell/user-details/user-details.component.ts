import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario } from "src/app/interfaces/usuario";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { Location, getLocaleDateFormat, formatDate } from "@angular/common";
import { TrabajoService } from "src/app/servicios/trabajo.service";
import { Observable } from "rxjs";
import { Trabajo } from "src/app/interfaces/trabajo";
import * as Cookies from "js-cookie";
import { EncryptService } from "src/app/servicios/encrypt.service";
import { isNullOrUndefined } from "util";
import { PdfMakeWrapper, Txt, Table, Cell } from "pdfmake-wrapper";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
  usuario: Usuario;
  trabajos: Trabajo[];
  detalles = true;
  adminPrivileges = false;
  iduser: any;
  menuDetalles = true;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private trabajoService: TrabajoService,
    private encrypt: EncryptService,
    private router: Router
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    if (!isNullOrUndefined(Cookies.get("USER_ACCESS"))) {
      this.adminPrivileges =
        parseInt(this.encrypt.decrypt(Cookies.get("USER_ACCESS"))) == 1;
      this.usuarioService.getUsuario(id).subscribe(
        (data) => {
          this.usuario = data;
        },
        (error) => {
          console.log(error);
        }
      );
      console.log(id);
      this.iduser = id;

      this.trabajoService
        .getTrabajoByUser(id)
        .subscribe((data) => (this.trabajos = data));
      this.detalles = true;
    } else {
      this.router.navigateByUrl("/error/403");
    }
  }

  volver() {
    this.location.back();
  }

  showModificar() {
    this.detalles = false;
  }

  showDetalles() {
    this.detalles = true;
  }

  getAcceso(acceso: number) {
    switch (acceso) {
      case 0:
        return "Deshabilitado";
      case 1:
        return "Administrador";
      case 2:
        return "Usuario";
    }
  }

  submit() {
    this.actualizarUsuario();
  }

  actualizarUsuario() {
    this.usuario.apellidos = this.usuario.nombre.split(",")[0];
    this.usuario.password = this.encrypt.encrypt(this.usuario.password);
    this.usuarioService.putUsuario(this.iduser, this.usuario).subscribe(data => data);
    this.detalles = true;
  }

  submitBtn(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    this.submit();
    submitBtn.disabled = false;
  }

  borrarUsuario() {
    this.menuDetalles = false;
  }

  cancelar() {
    this.menuDetalles = true;
  }

  borrar() {
    this.usuarioService.delete(this.iduser).subscribe((data) => {});
    this.router.navigateByUrl("/userlist");
  }

  enviarPDF() {
    this.generatePdf();
  }

  generatePdf() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let pdf: PdfMakeWrapper = new PdfMakeWrapper();

    pdf.add(pdf.ln(1));
    pdf.header(
      new Txt("Hoja de registro").alignment("center").fontSize(20).bold().end
    );

    pdf.add(
      new Txt("Datos personales").alignment("center").fontSize(16).bold().end
    );
    pdf.add("Nombre: " + this.usuario.nombre);
    pdf.add("Teléfono: " + this.usuario.movil);
    pdf.add("Email: " + this.usuario.email);
    pdf.add("Acceso: " + this.getAcceso(this.usuario.acceso));
    pdf.add(
    pdf.ln(4));

    pdf.styles({
      style1: { bold: true },
      style2: { italics: true },
    });

    pdf.add(
      new Txt("Registro de eventos").alignment("center").fontSize(16).bold().end
    );

    pdf.add(pdf.ln(2));
    let sueldo = 0;

    let fecha;    

    let tableBody = [];

    tableBody.push([new Txt("Evento").bold().end, new Txt("Fecha").bold().end,new Txt("Lugar").bold().end,new Txt("Puesto").bold().end, new Txt("Sueldo").bold().end, new Txt("Horas").bold().end]);
    let index = 0;
    this.trabajos.forEach((trabajo) =>
    {
      fecha = formatDate(trabajo.evento.fecha, "dd/MM/yyyy", "es_EA");
      tableBody.push([trabajo.evento.nombre,fecha, trabajo.evento.lugar, trabajo.rol.nombre, trabajo.rol.sueldo, trabajo.horas]);
      index++;
      sueldo = sueldo + trabajo.horas * trabajo.rol.sueldo;

    })



   /*  this.trabajos.forEach((trabajo) => {
      fecha = formatDate(trabajo.evento.fecha, "dd/MM/yyyy", "es_EA");
      pdf.add(
        new Txt(
          trabajo.evento.nombre +
            "\t\t" +
            fecha +
            "\t\t" +
            trabajo.evento.lugar +
            "\t\t" +
            trabajo.rol.nombre +
            "\t\t" +
            trabajo.rol.sueldo +
            "\t\t" +
            trabajo.horas
        ).fontSize(10).end
      );
      sueldo = sueldo + trabajo.horas * trabajo.rol.sueldo;
    }); */


    pdf.add(new Table(tableBody).layout('headerLineOnly').alignment('justify').end);

    pdf.add(pdf.ln(2));
    pdf.add(new Txt("Total a cobrar: " + sueldo + "€").alignment("right").end);

    pdf.ln(5);
    pdf.create().download();
  }
}
