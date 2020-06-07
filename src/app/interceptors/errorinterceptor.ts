import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

Injectable();
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {

        // Si se produce un error, nos envía a la página de error correspondiente
        if ((req.url.split("/")[5].startsWith("confirm") && error.status== 404) || error.status==200) {
        } else {
          
          this.router.navigateByUrl("/error/" + error.status);
        }
        return throwError(error.message || error);
      })
    );
  }
}
