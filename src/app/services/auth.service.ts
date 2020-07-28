import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public isAuthenticated(): boolean {
        const token = localStorage.getItem('Authorization');
        return token ? true : false;
    }
}