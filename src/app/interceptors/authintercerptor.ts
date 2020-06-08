import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as Cookies from 'js-cookie';

// Intercepta cualquier petición HTTP
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(){}

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

                // Si nos hemos logeado obtendremos el token jwt
        const idToken = Cookies.get("TOKEN_ID");

        // Clonamos la request y le añadimos el token en la cabecera
        if (idToken) {
            var cloned = req.clone({
                headers: req.headers.set("Authorization",
                    idToken)
            });
            cloned =  cloned.clone({url :encodeURI(cloned.url)});
            return next.handle(cloned);
        }
        // Si no nos hemos logeado, devolvemos la petición tal cual
        else {
           
            req =  req.clone({url :encodeURI(req.url)});
            return next.handle(req).pipe(
                catchError((err: HttpErrorResponse) => {
          
                  return throwError( err );
          
                }));
        }
        
    }
}
