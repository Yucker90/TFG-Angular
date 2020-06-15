import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario } from "src/app/interfaces/usuario";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { Location, formatDate } from "@angular/common";
import { TrabajoService } from "src/app/servicios/trabajo.service";
import { Trabajo } from "src/app/interfaces/trabajo";
import * as Cookies from "js-cookie";
import { EncryptService } from "src/app/servicios/encrypt.service";
import { isNullOrUndefined } from "util";
import { PdfMakeWrapper, Txt, Table } from "pdfmake-wrapper";
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
    // Obtenemos el id de la URL y cargamos el usuario desde el backend
    let id = this.route.snapshot.paramMap.get("id");
    // Si nos hemos logueado, obtenemos el Acceso (para mostrar más o menos información)
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
      this.iduser = id;
// Obtenemos los trabajos de ese usuario
      this.trabajoService
        .getTrabajoByUser(id)
        .subscribe((data) => (this.trabajos = data));
      this.detalles = true;
    } else {
      // Si no tenemos permiso, nos mostrará una pantalla de error
      this.router.navigateByUrl("/error/403");
    }
  }

  volver() {
    this.location.back();
  }

  // Mostramos el menú de modificar
  showModificar() {
    this.detalles = false;
  }

// Mostramos el menú de detalles
  showDetalles() {
    this.detalles = true;
  }

  // "Traducidos" el acceso numérico por uno legible
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

  // Actualizamos el usuario
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

  // Volvemos a mostrar el menú de detalles
  cancelar() {
    this.menuDetalles = true;
  }

  // Borramos al usuario
  borrar() {
    this.usuarioService.delete(this.iduser).subscribe((data) => {});
    this.router.navigateByUrl("/userlist");
  }

  // Llamos a una función que genera un pdf
  enviarPDF() {
    this.generatePdf();
  }

  generatePdf() {
    // Cargamos la fuente del pdf
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    // Creamos el archivo
    let pdf: PdfMakeWrapper = new PdfMakeWrapper();

    // Creamos la cabecera del pdf
    pdf.add(pdf.ln(1));
    pdf.header(
      new Txt("Hoja de registro").alignment("center").fontSize(20).bold().end
    );

    // Creamos la sección "Datos Personales"
    pdf.add(
      new Txt("Datos personales").alignment("center").fontSize(16).bold().end
    );
    pdf.add("Nombre: " + this.usuario.nombre);
    pdf.add("Teléfono: " + this.usuario.movil);
    pdf.add("Email: " + this.usuario.email);
    pdf.add("Acceso: " + this.getAcceso(this.usuario.acceso));
    pdf.add(
    pdf.ln(4));

    // Creamos unos estilos para las fuentes
    pdf.styles({
      style1: { bold: true },
      style2: { italics: true },
    });

    // Creamos la cabecera de la tabla de Trabajos
    pdf.add(
      new Txt("Registro de eventos").alignment("center").fontSize(16).bold().end
    );

    pdf.add(pdf.ln(2));
    let sueldo = 0;

    let fecha;    

    // Creamos la tabla vacía
    let tableBody = [];

    // Creamos la cabecera de la tabla y la añadimos a la tabla
    tableBody.push([new Txt("Evento").bold().end, new Txt("Fecha").bold().end,new Txt("Lugar").bold().end,new Txt("Puesto").bold().end, new Txt("Sueldo").bold().end, new Txt("Horas").bold().end]);
   // Recorremos todos los trabajos y los vamos añadiendo a la tabla
    this.trabajos.forEach((trabajo) =>
    {
      // Formateamos la fecha
      fecha = formatDate(trabajo.evento.fecha, "dd/MM/yyyy", "es_EA");
      tableBody.push([trabajo.evento.nombre,fecha, trabajo.evento.lugar, trabajo.rol.nombre, trabajo.rol.sueldo, trabajo.horas]);
      // En una variable acumulativa, calculamos el teórico sueldo a percibir del usuario
      sueldo = sueldo + trabajo.horas * trabajo.rol.sueldo;

    })

    // Añadimos la tabla al documento
    pdf.add(new Table(tableBody).layout('headerLineOnly').alignment('justify').end);

    pdf.add(pdf.ln(2));
    pdf.add(new Txt("Total a cobrar: " + sueldo + "€").alignment("right").end);

    pdf.ln(5);
    // Creamos el pdf en sí y le asignamos un nombre
    pdf.create().download(this.usuario.nombre.split(',')[0].trim() + this.usuario.nombre.split(',')[1].trim() + formatDate(new Date, "dd/MM/yyyy", "es_EA")+".pdf");
  }
}
