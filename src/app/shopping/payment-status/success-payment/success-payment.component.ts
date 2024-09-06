import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, PlatformLocation } from '@angular/common';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { DeleteServiceService } from 'src/app/service/delete-service.service';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.css']
})
export class SuccessPaymentComponent {
  ordersList:any
  constructor(private router: Router, private PlatformLocation: PlatformLocation,private locations:Location, private service: GettingserviceService,private deleteService:DeleteServiceService) {
    // history.pushState(null,'',location.href);
    // this.PlatformLocation.onPopState(()=>{
    //   history.pushState(null,'',location.href);
    // })
  }
  // ngOnInit(){
  //   this.location.replaceState('/main'); 
  // }
  ngOnInit(){
    this.deleteService.cartItemNumbers()

this.viewOrdersList()
  }
  backToShopping(){
    this.router.navigate(['/main'])
  }
  viewOrdersList() {
    this.service.getOrders().subscribe((data) => {
      this.ordersList = data.data[0]
    })
  }


}
