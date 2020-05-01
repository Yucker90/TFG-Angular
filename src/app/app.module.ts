import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PlantillaModule } from "./plantilla/plantilla.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/authintercerptor";
import localeEsEs from "@angular/common/locales/es-EA";
import { registerLocaleData } from "@angular/common";
import { ErrorInterceptor } from "./interceptors/errorinterceptor";
import { Router } from '@angular/router';

registerLocaleData(localeEsEs);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PlantillaModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor,  useFactory: function(router: Router) {
      return new ErrorInterceptor(router);
    }, multi: true, deps: [Router] },
    { provide: LOCALE_ID, useValue: "es-EA" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
