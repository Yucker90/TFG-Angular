import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as Cookies from 'js-cookie';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private router: Router){}

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = Cookies.get("TOKEN_ID");

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    idToken)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req).pipe(
                catchError((err: HttpErrorResponse) => {
          
                  return throwError( err );
          
                }));
        }
        
    }
}
