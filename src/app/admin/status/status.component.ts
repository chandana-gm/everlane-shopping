import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit{
  constructor(private getService:GettingserviceService, private postService:PostServiceService,private toaster:ToastrService){}
  Orderlist:any[]=[]
  items?: any = []
    searchText: any = ''
    loading= false;
    data:any
    currentOrderId:any

  ngOnInit(): void {
    this.orderView()
    
  }
orderView()
{

  this.getService.getOrders().subscribe((data:any)=>{
    console.log('alll oders',data);
    this.Orderlist=data.data
    this.items=data.data
    
  })
}

onStatusChange(event: Event,id:any) {
 
  this.loading = true;
  this.currentOrderId = id;
  const selectElement = event.target as HTMLSelectElement;
  const selectedValue = selectElement.value;
 
  console.log('Selected Status:', selectedValue);
  this.postService.orderStatusUpdate(id,selectedValue).subscribe((data)=>{
   this.data=data.data
 
   this.loading= false;
    this.toaster.success(data.message);
 
      this.orderView();
    }, error => {
      this.toaster.error('Failed to update order status', 'Error');
    });
}
filteredItems() {
  if (this.searchText != '') {
   
    this.Orderlist = this.items.filter((item: any) => item.order_code == this.searchText)
    console.log(this.searchText);

  } else {
    this.Orderlist = this.items
  }
}
}
