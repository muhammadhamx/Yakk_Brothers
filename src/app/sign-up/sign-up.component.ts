import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppServicesService } from '../services/app-services.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  
  signUpForm: FormGroup;
  formData: any;
  user : boolean = true
  userAlreadyExists = false; 

  constructor(
    private fb: FormBuilder,
    private services: AppServicesService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value 
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.formData = this.signUpForm.value;
    }
  }

  signUp(){
    if (this.signUpForm.invalid){
      return;
    }
    console.log('Form Value:', this.signUpForm.value);
    this.services.signUp(this.signUpForm.value).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('Error:', err);
        console.error('Error Details:', err.error);
        if (err.status === 400 && err.error.message === 'User already registered') {
          this.userAlreadyExists = true;  // Set the variable to true
        }
        return throwError(err);
      })
    ).subscribe((res) => {
      if (res.user) {
        console.log('User registered successfully:', res);
        this.userAlreadyExists = false;  // Reset the variable on success
        this.router.navigate(['/signin'])
      } else {
        console.log('User registration failed:', res.message);
      }
    }, (error) => {
      console.error('Error:', error);
    });


  }
}
