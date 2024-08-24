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

  passwordFieldType: string = 'password';
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.fb.group({


      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });

    
  
  }
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  onSubmit() {
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
            });
          } else {
            this.toastr.success(data.message);
            this.router.navigate(['/main']).then(() => {
              window.location.reload();
            });
          }
        },
        (error) => {
          console.error('login error:', error);
          this.toastr.error(error.error.message, 'Error');
        }
      );
    }
  }
  

  
}



