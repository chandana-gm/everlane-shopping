import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {
  constructor(private getService: GettingserviceService, private postService: PostServiceService,private toaster:ToastrService) { }
  returnList: any[] = []


  ngOnInit(): void {
    this.getAllreturn();
  }
  getAllreturn() {

    this.getService.getAllreturnProduct().subscribe((res) => {
      console.log(res);
      this.returnList = res.data
    })
   

  }

  approve(item: any, action: any) {
    this.postService.approvReturn(item.id, action).subscribe((data) => {
      console.log(data, 'vmgvj');
      this.getAllreturn();
      if(data.status=="success"){
        this.toaster.success(data.message, 'Success');
      }
      else{
        this.toaster.error(data.message, 'Error');
      }

       
    })
  }
 
}
