import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.css']
})
export class SuccessPaymentComponent {
  constructor(private router: Router, private location: Location) {}
  ngOnInit(): void {
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', this.onPopState.bind(this));
  }
  onPopState(event: any): void {
    this.router.navigate(['/main']); 
  }
}
