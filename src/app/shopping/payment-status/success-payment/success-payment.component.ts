import { Component, HostListener, OnInit } from '@angular/core';
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
  this.router.navigate(['/your-target-page']).then(() => {
    // Replace the current state to prevent back navigation
    this.location.replaceState('/your-target-page');
  });

  // Listen for back button events
  window.addEventListener('popstate', () => {
    // Prevent back navigation by navigating to the current page
    this.router.navigate(['/your-target-page']);
  });
}
}
