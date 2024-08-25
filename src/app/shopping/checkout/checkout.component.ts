import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteServiceService } from 'src/app/service/delete-service.service';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  ngOnInit() {
    window.scroll(0, 0)
    this.getAddress()
    this.getDisasterList()
    console.log(this.checkoutForm.status);
  }
  checkoutForm: FormGroup;
  currentStep: number = 0;
  isOrderConfirmed = false
  selectedType: string = 'delivery';
  selectedPlace: string = ''
  selectedPaymentMethod: string = 'ONLINE';
  showPaymentMethod: boolean = false;
  addressList: any
  upiId: string = '';
  selectedAddress: any;
  ifAddress: boolean = false
  addressId = ''
  disasterList: any
  activeSection: string = 'addAddress';
  selectedAddressId: any = null;
  isProcessing = false;


  constructor(
    private fb: FormBuilder,
    private route: Router,
    private service: GettingserviceService,
    private postService: PostServiceService,
    private toster: ToastrService,
    private deleteService: DeleteServiceService) {
    this.checkoutForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      landMark: [''],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      locality: ['', Validators.required],
    });
  }
  selectType(type: string): void {
    this.selectedType = type;
  }
  getAddress() {
    this.service.getAddress().subscribe((data) => {
      this.addressList = data.data
    })
  }
  addressCreated(form: any) {
    console.log(form);

    this.postService.createAddress(form).subscribe((data) => {
      // this.toster.success(data.message)
      this.addressId = data.data.id
      console.log(this.addressId);
      this.showPaymentMethod = true;
      console.log(this.addressId);

    })
  }
  proceedToPayment() {
    this.showPaymentMethod = true;
  }
  confirmOrder() {
    this.isProcessing = true;
    this.postService.postPlaceOrder(this.selectedType, this.selectedPaymentMethod, this.addressId, this.selectAddress, this.selectedPlace).subscribe((data) => {
      this.toster.success(data.message)
      this.deleteService.cartItemNumbers()
      this.isOrderConfirmed = true
      this.isProcessing = false;

    }
      , (error) => {
        this.isProcessing = false;
        this.toster.error('Order could not be placed. Please try again.');
      })
  }
  getDisasterList() {
    this.service.getDisasterList().subscribe((data) => {
      this.disasterList = data.data

    })
  }

  isNextButtonDisabled(): boolean {
    if (this.selectedPaymentMethod === 'ONLINE') {
      return !this.upiId;
    }
    return false;
  }

  selectAddress(address: any): void {
    this.selectedAddress = address.id
    this.ifAddress = true
    this.addressId = address.id
    console.log(this.addressId);

  }

  toggleSection(section: string): void {
    this.activeSection = section;
    if (section === 'addAddress') {
      this.addressId = ''
    }
  }
  selectExistingAddress() {
    this.showPaymentMethod = true;

  }
}

