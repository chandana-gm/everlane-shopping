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
      
          console.log('abc',formdata.username);
          
          if (formdata.username == 'admin1' && formdata.password == 'Admin12345') {
            console.log('loginResponse', data);
            
            const encryptedData = this.service.encryptData(data.token, 'token');
          console.log(encryptedData, 'encryptedData');
          const user = { 'username': data.username, 'token': encryptedData };
          localStorage.setItem('user', JSON.stringify(user));
          this.toastr.success('Welcome Admin!');
            this.router.navigate(['/admin']);
          } else{
           
          console.log('loginResponse', data);
          const encryptedData = this.service.encryptData(data.token, 'token');
          console.log(encryptedData, 'encryptedData');
          const user = { 'username': data.username, 'token': encryptedData };
          localStorage.setItem('user', JSON.stringify(user));
          this.toastr.success(data.message);
           this.router.navigate(['/main']);
          }
       
          // window.location.reload()
        },
        (error) => {
          console.error('login  error:', error);
          this.toastr.error(error.error.message, 'Error');
        },
        () => {
          // Complete block (runs after success or error)
          this.loading = false; 
        }
      );
      // this.loginForm.reset();
    }
  }

  
}



