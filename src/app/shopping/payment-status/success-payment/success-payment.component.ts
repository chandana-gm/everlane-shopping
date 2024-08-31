import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.css']
})
export class SuccessPaymentComponent {
  constructor(private router: Router, private PlatformLocation: PlatformLocation,private locations:Location) {
    // history.pushState(null,'',location.href);
    // this.PlatformLocation.onPopState(()=>{
    //   history.pushState(null,'',location.href);
    // })
  }
  // ngOnInit(){
  //   this.location.replaceState('/main'); 
  // }
  backToShopping(){
    this.router.navigate(['/main'])
  }


}
