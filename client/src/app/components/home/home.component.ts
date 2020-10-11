import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { User } from '../../model/user.model';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    user: User;
    constructor(private formService: FormService) { }

    ngOnInit(): void {
        this.formService.getProfile().subscribe(profile => {
            if (profile['success']) {
                this.user = profile['user']
            } err => {

                console.log(err);
            }
        })
    }

}
