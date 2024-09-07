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
    isProcesing=false
    listProcess=false
    currentPage: number = 1;
    totalItems: any;
    next: string | null = null;
    previous: string | null = null;
    AllOrders:any[]=[]
    isSearching: boolean = false;

  ngOnInit(): void {
    this.orderView()
    this.loadProducts()
  }
orderView()
{
 this.isProcesing=true
  this.getService.getOrders().subscribe((data:any)=>{
  
    console.log('alll oders',data);
    this.Orderlist=data.data
    this.isProcesing=false
    this.listProcess=true
    this.items=data.data
    
  })

  }

onStatusChange(event: Event,id:any) {
 
  this.loading = true;
  this.currentOrderId = id;
  const selectElement = event.target as HTMLSelectElement;
  const selectedValue = selectElement.value;
  console.log(selectedValue,'abc');
  
 
  console.log('Selected Status:', selectedValue);
  this.postService.orderStatusUpdate(id,selectedValue).subscribe((data)=>{
   this.data=data.data
 
   this.loading= false;
   if (selectedValue === 'Completed') {
    this.toaster.info('Order has been successfully completed!');
 
      this.loadProducts();
    } else {
      this.toaster.success(data.message);
      this.loadProducts();
    }

    }, error => {
      this.toaster.error('Failed to update order status', 'Error');
    });
}




loadProducts(page: number = 1): void {
  this.isProcesing=true
   this.isSearching = false;
  this.getService.getOrderPagination(page).subscribe((data:any)=>{
     this.isProcesing=false
     console.log('paginated', data);
     this.AllOrders = data.results.data;
     console.log(this.AllOrders);
     
     this.totalItems = data.count;
     this.next = data.next;
     this.previous = data.previous;
   });
 }

 onPageChange(page: number): void {
   this.currentPage = page;
   this.loadProducts(page);
 }

 loadNextPage(): void {
   if (this.next) {
     this.currentPage++;
     this.loadProducts(this.currentPage);
   }
 }

 loadPreviousPage(): void {
   if (this.previous) {
     this.currentPage--;
     this.loadProducts(this.currentPage);
   }
  }
  // filteredItems() {
  //   this.isSearching = true;
  //   if (this.searchText != '') {
  //     this.getService.orderSearch(this.searchText).subscribe((data) => {
      
  //       this.AllOrders =data
  //       this.isSearching = false;

  //       console.log('abc',this.AllOrders);
  //     });
  //   } else {
  //     this.loadProducts();
  //   }
  // }
  filteredItems() {
    this.isSearching = true;
    if (this.searchText.trim() !== '') {
      this.getService.orderSearch(this.searchText).subscribe((data) => {
        // Assuming the API response contains an array of orders
        this.AllOrders = data.results.data; // Make sure this variable is used in the template to display orders
        this.isSearching = false;
        console.log(this.AllOrders);
      }, error => {
        console.error('Error while searching:', error);
        this.isSearching = false;
      });
    } else {
      this.loadProducts(); // Load all products when search text is empty
    }
  }
  
}
