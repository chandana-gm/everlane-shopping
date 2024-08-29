import { Component, OnInit } from '@angular/core';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  isAuthenticated=false
  constructor( private service:PostServiceService){}
  ngOnInit(): void {
    
  }
// logout() {
//   this.service.postLogout().subscribe((data)=>{
//     console.log(data);
//     this.isAuthenticated = false;
 
//     localStorage.removeItem('user');
    
//   })
   
}


