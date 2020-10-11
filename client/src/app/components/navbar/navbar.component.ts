import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private formService: FormService) { }

    ngOnInit(): void {
    }

    logout(): void {
        this.formService.logout();
    }

    isLoggedIn(): boolean {
        return this.formService.loggedIn();
    }
}
