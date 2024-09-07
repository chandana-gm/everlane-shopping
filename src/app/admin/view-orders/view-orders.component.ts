import { Component, OnInit } from '@angular/core';
import { GettingserviceService } from 'src/app/service/gettingservice.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit{
  constructor(private getService:GettingserviceService){}
  currentPage: number = 1;
  totalItems: any;
  next: string | null = null;
  previous: string | null = null;
  AllOrders:any[]=[]
  isProcesing=false
  
  ngOnInit(): void {
    this.loadProducts()
  }
  loadProducts(page: number = 1): void {
    this.isProcesing=true
    //  this.isSearching = false;
    this.getService.getAllOreders(page).subscribe((data:any)=>{
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

}
