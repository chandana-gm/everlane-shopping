import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DeleteServiceService } from 'src/app/service/delete-service.service';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any = {};
  currentSection: string = 'section1';
  addressList: any
  checkoutForm: FormGroup;
  addressMessage: any
  showAddressForm: boolean = false;
  myDonation: any[] = []
  ordersList: any
  newPasswordValue: string = '';
  isPasswordValid: boolean = false;
  loading: boolean = false
  singleProduct:any
  selectedItem: any = null;
  returnReasons: string[] = ['Reason 1', 'Reason 2', 'Reason 3'];
  ifReturned=false
  returnRequestSuccessful: { [key: number]: boolean } = {};
  donations:any[]=[]

  constructor(
    private service: GettingserviceService,
    private fb: FormBuilder,
    private deleteService: DeleteServiceService,
    private toster: ToastrService,
    private postService: PostServiceService) {
    this.checkoutForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      locality: ['', Validators.required],
      landMark: [''],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });
  }


  showReturnFields: { [key: string]: boolean } = {};
  returnReason: { [key: string]: string } = {};
  returnQuantity: { [key: string]: number } = {};

  cancelRequest(): void {
    this.selectedItem = null;
  }

  sendReturnRequest(productItem: number) {
    const quantity = this.returnQuantity[productItem];
    const reason = this.returnReason[productItem];
    console.log('Return Request:', { productItem, quantity, reason });
    this.postService.requestRequestPost(productItem,quantity,reason).subscribe((data)=>{
      this.toster.success(data.message)
      this.returnRequestSuccessful[productItem] = true;
    this.selectedItem = null;

    }
  )

  }
  returnRequest(item: any): void {
    this.selectedItem = item; 
    this.returnQuantity[item.id] = 1; 
  }

  getQuantityOptions(quantity: number): number[] {
    return Array.from({ length: quantity }, (_, i) => i + 1);
  }

  toggleReturnFields(productId: string) {
    this.showReturnFields[productId] = !this.showReturnFields[productId];
  }
  
  ngOnInit(): void {
    window.scroll(0, 0);
    this.getUserProfile();
    this.getAddress()
    this.viewOrdersList()
    this.deleteService.getWithoutRefresh().subscribe(() => {
      this.getAddress()
    })
    this.service.getMyDonation().subscribe((response) => {
      console.log('data', response);
      this.myDonation = response.data
    })
    this.service.getUserDonatios().subscribe((res)=>{

      console.log('whfudh',res);
this.donations=res.data
      
    })
    
  }

  onSubmit() {
    this.loading = true
    console.log('Updated userData:', this.userData);
    this.deleteService.updateProfile(this.userData).subscribe((data) => {
      this.toster.success(data.message)
      this.checkoutForm.reset();
      this.loading = false
    })
  }

  addressCreated(form: any) {
    this.postService.createAddress(form).subscribe((data) => {
      this.toster.success(data.message)
      this.deleteService.sendWithoutRefresh()
    })
  }

  getAddress() {
    this.service.getAddress().subscribe((data) => {
      this.addressList = data.data
      this.addressMessage = data.status

    })
  }
  checkPasswordValidity(): void {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    this.isPasswordValid = passwordPattern.test(this.newPasswordValue);
  }
  changePassword(passwords: { old_password: string; new_password: string }) {
    this.loading = true
    this.deleteService.changePassword(passwords).subscribe((data) => {
      this.toster.success(data.message)
      this.loading = false
    }, (error) => {
      this.toster.error(error.error.message)
      this.loading = false
      // console.error(error)
    }
    )
  }

  showSection(section: string) {
    this.currentSection = section;
  }
  showForm() {
    this.showAddressForm = true;
  }

  getUserProfile() {
    this.service.getProfile().subscribe((data) => {
      this.userData = data.data;
      console.log(this.userData);
    });
  }
  removeAddress(id: any) {
    this.deleteService.removeAddress(id).subscribe((data) => {
      this.toster.success(data.message)
      this.deleteService.sendWithoutRefresh()

    })
  }
  viewOrdersList() {
    this.service.getOrders().subscribe((data) => {
      this.ordersList = data.data
    })
  }

  OrderDetail(item: any) {
    console.log(item);
    this.singleProduct=item

  }

}
