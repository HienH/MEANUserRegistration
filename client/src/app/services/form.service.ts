import { Injectable } from '@angular/core';
import {
    HttpClient, HttpHeaders
} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class FormService {

    constructor(private http: HttpClient) { }

    registerUser(user) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/user/register', user, { headers: headers });
    }

    loginUser(user) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/user/authenticate', user, { headers: headers });

    }
}
