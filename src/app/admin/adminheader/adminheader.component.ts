import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit{
constructor(private service:PostServiceService,private router:Router,private toster:ToastrService){}
ngOnInit(): void {
  
}
//   logout() {
//     this.service.postLogout().subscribe((response) => {
//      this.toster.success(response.message)
//      localStorage.removeItem('user');
//      this.router.navigate(['/main']).then(() => {
 
//      });
//    });
//  }
}

