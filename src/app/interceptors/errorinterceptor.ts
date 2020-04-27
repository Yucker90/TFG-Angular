import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { toBase64String } from '@angular/compiler/src/output/source_map';

Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(){}


    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

            return next.handle(req).pipe(
                catchError(error => {
                  //handle specific errors
                  if (error.status === 400) {
                      
                  }
          
                  //default case: print, log, toast, etc...
                  return throwError(error.message || error);
                })
              );
        }

    
}