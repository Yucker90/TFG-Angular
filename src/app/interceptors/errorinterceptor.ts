import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

Injectable();
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  service;
  //constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        //handle specific errors
        //default case: print, log, toast, etc...
        if ((req.url.split("/")[5].startsWith("confirm") && error.status== 404) || error.status==200) {
        } else {
          
          this.router.navigateByUrl("/error/" + error.status);
        }
        return throwError(error.message || error);
      })
    );
  }
}
