import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { FormService } from '../../services/form.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted: boolean;
    error: boolean;
    errorMessage: string;

    constructor(private fb: FormBuilder, private router: Router, private formService: FormService) { }

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.loginForm = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required],
        });
    }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.valid) {
            this.formService.loginUser(this.loginForm.value).subscribe(data => {
                if (data['success']) {
                    this.formService.storeUserData(data['token'], data['user'])
                    this.router.navigate(['./home']);
                } else {
                    this.error = true;
                    this.errorMessage = data['msg']
                }
            })
        }

    }
}
