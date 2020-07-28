import { Injectable } from '@angular/core';
import { Router, CanLoad, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class PreventLoginService implements CanActivate {
    constructor(public auth: AuthService, public router: Router) { }
    canActivate(): boolean {
        console.log(this.auth.isAuthenticated());
        return !this.auth.isAuthenticated();
    }
}