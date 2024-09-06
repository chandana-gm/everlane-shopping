import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { PostServiceService } from 'src/app/service/post-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  signUpForm!: FormGroup;
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  loading: boolean = false


  constructor(private fb: FormBuilder,
    private router: Router,
    private service: PostServiceService,
    private toastr: ToastrService,
    private location: Location) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country_code:['',[Validators.required]],
      mobile: ['', Validators.required],
      // mobile: ['', [Validators.required, this.mobileValidator]],
      password: ['', [Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%#*?&])[A-Za-z\\d@$!%#*?&]{8,}$')]],
      confirm_password: ['', [Validators.required,]]
    }, { validator: this.passwordMatchValidator });
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    } else if (field === 'confirmPassword') {
      this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
    }
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

  get password() {
    return this.signUpForm.get('password');
  }

  onSubmit(): void {
    this.loading = true
    if (this.signUpForm.valid) {
      this.service.postRegistration(this.signUpForm.value).subscribe(
        (response: any) => {
          this.toastr.success(response.message);
          this.loading=false
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          this.loading = false
          // this.toastr.error(
          //   error.error?.data?.username
          //     ? error.error.data.username[0]
          //     : error.error.data.email
          //     ? error.error.data.email[0]
          //     : error.error.data.mobile
          //     ? error.error.data.mobile[0]
          //     : error.error.data.country_code[0]
          //     ? error.error.data.country_code[0]
          //     : 'Something went wrong, please try again'
          // );
          this.toastr.error(error.error.message)

        }
      );

    }
  }

  goBack() {
    this.location.back();
  }


}
