import { Component, OnInit } from '@angular/core';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  constructor( private service:PostServiceService){}
  ngOnInit(): void {
    
  }
  // async logout() {
   
  //   this.service.postLogout().subscribe((data)=>{
  //     console(d)
  //   })
  // }

}
