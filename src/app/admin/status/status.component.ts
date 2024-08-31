import { Component, OnInit } from '@angular/core';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit{
  constructor(private getService:GettingserviceService, private postService:PostServiceService){}
  Orderlist:any[]=[]

  ngOnInit(): void {
    this.orderView()
    
  }
orderView()
{

  this.getService.getOrders().subscribe((data:any)=>{
    console.log('alll oders',data);
    this.Orderlist=data.data
    
  })
}

onStatusChange(event: Event,id:any) {
  const selectElement = event.target as HTMLSelectElement;
  const selectedValue = selectElement.value;
  console.log('Selected Status:', selectedValue);
  this.postService.orderStatusUpdate(id,selectedValue).subscribe((data)=>{
    console.log(data);

    
  }) ,   this.orderView()
  
}
}
