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

  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.fb.group({

      // email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('data', this.loginForm.value);
      const formdata = this.loginForm.value;
  
      this.service.postLogin(formdata).subscribe(
        (data: any) => {
          console.log('loginResponse', data);
          
          // Encrypt the token
          const encryptedData = this.service.encryptData(data.token, 'token');
          console.log(encryptedData, 'encryptedData');
          
          // Store username and encrypted token in localStorage
          const user = { 'username': data.username, 'token': encryptedData };
          localStorage.setItem('user', JSON.stringify(user));
          
          // Display success message
          this.toastr.success(data.message);
          
          // Navigate to the main page
          this.router.navigate(['/main']);
        },
        (error) => {
          console.error('Registration error:', error);
          this.toastr.error(error.error.message, 'Error');
        }
      );
  
      // Reset the form after submission
      this.loginForm.reset();
    }
  }
  
}



