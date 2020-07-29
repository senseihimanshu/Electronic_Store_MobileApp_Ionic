import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let ignore =
            typeof httpRequest.body === "undefined"
            || httpRequest.body === null
            || httpRequest.body.toString() === "[object FormData]" // <-- This solves your problem
            || httpRequest.headers.has("Content-Type");

        if (ignore) {
            const headers = { 'Authorization': localStorage.getItem('Authorization') };

            if (!headers['Authorization']) {
                delete headers['Authorization']
            }
            return next.handle(httpRequest.clone({ setHeaders: headers }));
        }

        const headers = { 'Authorization': localStorage.getItem('Authorization'), 'Content-Type': 'application/json' };

        if (!headers['Authorization']) {
            delete headers['Authorization']
        }
        return next.handle(httpRequest.clone({ setHeaders: headers }));
    }
} 