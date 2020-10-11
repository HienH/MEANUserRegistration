import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FormService } from '../services/form.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private formService: FormService, private router: Router) {
    }

    canActivate(): boolean {
        if (this.formService.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['./login'])
            return false
        }
    }
}