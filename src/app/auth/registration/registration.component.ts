import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  signUpForm!: FormGroup;

  
  constructor(private fb: FormBuilder,private router:Router ,private service:PostServiceService) {}
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, this.mobileValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordMatchValidator });
    
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmedPassword = control.get('confirm_password');
    if (password && confirmedPassword && password.value !== confirmedPassword.value) {
      return { mismatch: true };
    }
    return null;
  }
  mobileValidator(control: AbstractControl): ValidationErrors | null {
    const mobilePattern = /^[0-9]{10}$/;
    if (!control.value || mobilePattern.test(control.value)) {
      return null; 
    }
    return { invalidMobile: true }; 
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log('haiiiiii');
      console.log('datas',this.signUpForm.value);
      const data = this.signUpForm.value
      this.service.postRegistration(data).subscribe((data: any) => {

        console.log('response',data)


      })
      this.signUpForm.reset();
      this.router.navigate(['/auth/login'])

    }}
    




    
}

