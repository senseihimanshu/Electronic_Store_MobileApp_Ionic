import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ILogin, ILoginResponse } from './login.model';

import { HOST } from '../config/apiHost.config';
import { Observable } from 'rxjs';

const LOGIN_API = `${HOST}/login/`;

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) { }

    login(login: ILogin): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(LOGIN_API, login);
    }
}