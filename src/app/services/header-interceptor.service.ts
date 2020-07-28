import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = { 'Authorization': localStorage.getItem('Authorization'), 'Content-Type': 'application/json' };

        console.log(httpRequest);

        if (!headers['Authorization']) {
            delete headers['Authorization']
        }
        return next.handle(httpRequest.clone({ setHeaders: headers }));
    }
} 