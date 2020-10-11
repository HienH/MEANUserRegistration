import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { Router } from "@angular/router"

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted: boolean;
    error: boolean;

    constructor(private fb: FormBuilder, private formServie: FormService, private router: Router) { }

    ngOnInit(): void {
        this.createForm();
        this.submitted = false;
    }

    createForm() {
        this.registerForm = this.fb.group({
            name: [null, Validators.required],
            username: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required],
        });
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.registerForm.valid) {
            this.formServie.registerUser(this.registerForm.value).subscribe(data => {
                if (data['success']) {
                    this.router.navigate(['./login']);
                } else {
                    this.error = true;
                }
            })
        }
        console.log(this.registerForm.value)
    }

}
