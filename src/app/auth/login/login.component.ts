import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private fb:FormBuilder,private service:PostServiceService){}
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
  
})

}

  

}
}
