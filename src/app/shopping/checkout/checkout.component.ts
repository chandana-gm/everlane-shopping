import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  ngOnInit(){
    window.scroll(0,0)
  }
  checkoutForm: FormGroup;
  currentStep: number = 0;
  isOrderConfirmed=false

  constructor(private fb: FormBuilder, private route:Router) {
    this.checkoutForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      landMark: [''],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      paymentOption: ['', Validators.required],
      upiId: [''],
    });
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  nextStep() {
    if (this.isCurrentStepValid() && this.currentStep < 1) {
      this.currentStep++;
    }
  }

  isCurrentStepValid(): boolean {
    const controls = this.checkoutForm.controls;
    switch (this.currentStep) {
      case 0:
        return controls['address'].valid && controls['city'].valid && controls['postalCode'].valid;
      case 1:
        return controls['paymentOption'].valid && (controls['paymentOption'].value === 'upi' ? controls['upiId'].valid : true);
      default:
        return false;
    }
  }

  submitForm() {
    if (this.checkoutForm.valid) {
      console.log('Form Submitted', this.checkoutForm.value);
      this.isOrderConfirmed = true;
    } else {
      console.log('Form is not valid');
    }
  }
  backToShopping(){
this.route.navigate(['/main'])
  }
}
