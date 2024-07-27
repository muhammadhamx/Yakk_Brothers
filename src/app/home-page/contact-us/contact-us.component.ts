import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppServicesService } from 'src/app/services/app-services.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private services: AppServicesService,
    private dialogRef: MatDialogRef<ContactUsComponent>) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.services.sendMail(this.contactForm.value).subscribe(
        response => {
          console.log('Email sent successfully', response);
          alert('Email sent successfully');
          this.dialogRef.close();
        },
        error => {
          console.error('Error sending email', error);
          alert('Error sending email');
        }
      );
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}