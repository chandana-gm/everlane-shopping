import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteServiceService } from 'src/app/service/delete-service.service';
import { GettingserviceService } from 'src/app/service/gettingservice.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  payerId: any;
  paymentId: any;
  token: any;

  // Flags to track payment status
  paymentSuccess: boolean = false;
  paymentFailed: boolean = false;
  paymentProcessing: boolean = true;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private getService: GettingserviceService,
    private deleteService: DeleteServiceService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.payerId = params['PayerID'];
      this.paymentId = params['paymentId'];
      this.token = params['token'];

      if (this.payerId && this.paymentId && this.token) {
        this.getService.getPaymentUpdation(this.payerId, this.paymentId, this.token).subscribe((data) => {
          if (data.status === 'success') {
            this.paymentProcessing = false;
            this.deleteService.cartItemNumbers()
            this.router.navigate(['shopping/payment-success'])
          } else if (data.status === 'failed') {
            this.paymentFailed = true;
            this.paymentProcessing = false;

          }
        }, error => {
          this.paymentFailed = true;
          this.paymentProcessing = false;
        });
      } else if (this.token && !this.payerId && !this.paymentId) {
        this.getService.cancelOrder(this.token).subscribe((data) => {
          this.router.navigate(['shopping/payment-failed'])
          this.paymentFailed = true;
          this.paymentProcessing = false;
        }, error => {
          this.paymentFailed = true;
          this.paymentProcessing = false;
        });
      }
    });
  }
}
