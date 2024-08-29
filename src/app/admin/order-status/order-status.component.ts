import { Component, OnInit } from '@angular/core';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {
  constructor(private getService: GettingserviceService,private postService:PostServiceService) { }
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

  approve(item:any) {
this.postService.approvReturn(item).subscribe((data)=>{
  console.log(data,'vmgvj');
  
})
  }

}
