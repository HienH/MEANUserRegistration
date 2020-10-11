import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormService } from './services/form.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        RegisterComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [FormService],
    bootstrap: [AppComponent]
})



export class AppModule { }
