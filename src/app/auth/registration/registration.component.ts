import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  signUpForm!: FormGroup;

  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
     lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
          confirmedpassword: ['', Validators.required,Validators.minLength(6)]
    }, { validator: this.passwordMatchValidator });
  }

  
  passwordMatchValidator(control:AbstractControl)
  {
      return control.get('password')?.value === control.get('confirmedpassword')?.value
        ? null : { mismatch: true };
      }


  onSubmit() {
    if (this.signUpForm.valid) {

    }}
}
