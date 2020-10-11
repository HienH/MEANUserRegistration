import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class FormService {

    authToken: string;

    constructor(private http: HttpClient) { }

    registerUser(user) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post('user/register', user, { headers: headers });
    }

    loginUser(user) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post('user/authenticate', user, { headers: headers });
    }

    storeUserData(token, user) {
        localStorage.setItem('jwt', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    logout() {
        this.authToken = null;
        localStorage.clear()
    }

    getProfile() {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.getToken()
        });
        return this.http.get('user/profile', { headers: headers })
    }

    getToken() {
        return localStorage.getItem('jwt')
    }

    loggedIn(): boolean {
        const helper = new JwtHelperService();
        let token = localStorage.getItem('jwt')
        if (token) {
            console.log('token')
            return !helper.isTokenExpired(token.split(' ')[1]);
        } else false;
    }
}   
