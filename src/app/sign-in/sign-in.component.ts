import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AppServicesService } from '../services/app-services.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;
  formData: any;
  signInError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AppServicesService

  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }
 
  signIn(){
    if (this.signInForm.invalid) {
      return;
    }

    this.service.signIn(this.signInForm.value).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('Error:', err);
        console.error('Error Details:', err.error);

        if (err.status === 400) {
          this.signInError = 'Invalid email or password';
        } else if (err.status === 500) {
          this.signInError = 'Server error';
        } else {
          this.signInError = 'An unknown error occurred';
        }

        return throwError(err);
      })
    ).subscribe((res) => {
      if (res.user) {
        this.router.navigate(['/homePage'])
        console.log('User signed in successfully:', res);
        this.signInError = null;  // Reset the error on success
        // Handle successful sign-in, e.g., store the token, navigate to home, etc.
      } else {
        console.log('Sign-in failed:', res.message);
      }
    }, (error) => {
      console.error('Error:', error);
    });
  }
  
  
  
 

  onSubmit() {
    if (this.signInForm.valid) {
      this.formData = this.signInForm.value;
    }
  }
}
