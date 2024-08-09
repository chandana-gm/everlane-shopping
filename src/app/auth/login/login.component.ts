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
  constructor(private fb:FormBuilder,private service:PostServiceService,private router:Router,private toastr:ToastrService){}
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
onSubmit(){

if(this.loginForm.valid)
{

  console.log('data',this.loginForm.value);
  const formdata=this.loginForm.value 
  this.service.postLogin(formdata).subscribe((data:any)=>{
  console.log('loginResponse',data);
  this.toastr.success(data.response, 'Success');
  this.router.navigate(['/main/home']);
  },
  
  (error) => {

    console.error('Registration error:', error);
    this.toastr.error('Login failed. Please try again.', 'Error');
  
  
}

);
this.loginForm.reset();

}
  }
  }

  

