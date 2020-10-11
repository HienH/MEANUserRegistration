import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted: boolean;
    constructor(private fb: FormBuilder) { }

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

        console.log(this.registerForm.value)
    }

}
