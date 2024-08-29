import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostServiceService } from 'src/app/service/post-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: PostServiceService, private router: Router, private toastr: ToastrService) { }
  email: string = '';
  password: string = '';
  loading: boolean = false;
  forgotPasswordForm!: FormGroup;
  passwordFieldType: string = 'password';
  loginForm!: FormGroup;
  forgotPasswordMode = false;


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
    this.forgotPasswordForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]]
    });
  }


  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  onLoginSubmit() {
    this.loading = true
    if (this.loginForm.valid) {
      console.log('data', this.loginForm.value);
      const formdata = this.loginForm.value;

      this.service.postLogin(formdata).subscribe(
        (data: any) => {
          const encryptedData = this.service.encryptData(data.token, 'token');
          console.log(encryptedData, 'encryptedData');
          const user = { username: data.username, token: encryptedData };
          localStorage.setItem('user', JSON.stringify(user));

          if (formdata.username === 'admin1' && formdata.password === 'Admin12345') {
            this.toastr.success('Welcome Admin!');
            this.router.navigate(['/admin']).then(() => {
              window.location.reload();
              this.loading = false

            });
          } else {
            this.router.navigate(['/main']).then(() => {
              window.location.reload();
              this.loading = false
            });
          }
        },
        (error) => {
          console.error('login error:', error);
          this.toastr.error(error.error.message, 'Error');
          this.loading = false
        }
      );
    }
  }


  toggleForgotPasswordMode() {
    this.forgotPasswordMode = !this.forgotPasswordMode;
  }
  onForgotPasswordSubmit() {
    this.loading = true
this.service.forgotPassword(this.forgotPasswordForm.value).subscribe((data)=>{
this.toastr.success(data.message)
this.loading=false
},
error=>{
  this.toastr.error(error.error.error)
  this.loading=false
}
)



  }
}


