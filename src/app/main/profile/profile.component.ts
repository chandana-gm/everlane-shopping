import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteServiceService } from 'src/app/service/delete-service.service';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('passwordForm') passwordForm!: NgForm;
  userData: any = {};
  currentSection: string = 'section1';
  addressList: any
  checkoutForm: FormGroup;
  addressMessage: any
  showAddressForm: boolean = false;
  myDonation: any[] = []
  ordersList: any
  newPasswordValue: string = '';
  currentPasswordValue=''
  isPasswordValid: boolean = false;
  loading: boolean = false
  singleProduct: any
  selectedItem: any = null;
  returnReasons: string[] = ['Wrong Item Delivered', 'Damaged or Defective Item', 'Incorrect Size or Fit', 'Quality Issue', 'Wrong Color', 'Others'];
  ifReturned = false
  returnRequestSuccessful: { [key: number]: boolean } = {};
  donations: any[] = []
  showCurrentPassword = false;
  showNewPassword = false;
  loadinggif = false
  notifications: any
  cancelSuccess: boolean = false;
  showPopupIndex: number | null = null;
  currentPasswordVisible: boolean = false;
  newPasswordVisible: boolean = false;
  passwordVisible: boolean = false;
  isCancellingOrder: { [orderId: number]: boolean } = {};
  orderCanceled: { [key: string]: boolean } = {};


  constructor(
    private service: GettingserviceService,
    private fb: FormBuilder,
    private deleteService: DeleteServiceService,
    private toster: ToastrService,
    private router:Router,
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
    this.loading = true
    const quantity = this.returnQuantity[productItem];
    const reason = this.returnReason[productItem];
    console.log('Return Request:', { productItem, quantity, reason });
    this.postService.requestRequestPost(productItem, quantity, reason).subscribe((data) => {
      this.toster.success(data.message)
      this.returnRequestSuccessful[productItem] = true;
      this.selectedItem = null;
      this.loading = false

    }
    )

  }
  returnRequest(item: any): void {
    this.selectedItem = item;
    this.returnQuantity[item.id] = 1;
  }
  cancelOrder(item: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to cancel this order? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isCancellingOrder[item.id] = true;
        this.deleteService.cancelOrder(item.id).subscribe({
          next: (response) => {
            console.log(response);
            this.viewOrdersList();
            this.orderCanceled[item.id] = true;
            this.isCancellingOrder[item.id] = false;
            Swal.fire('Cancelled!', 'Your order has been cancelled.', 'success');
          },
          error: (error) => {
            this.isCancellingOrder[item.id] = false;
            this.toster.error(error.error.message);
          }
        });
      }
    });
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
    this.getNotifications()
    this.deleteService.getWithoutRefresh().subscribe(() => {
      this.getAddress()
    })
    this.service.getMyDonation().subscribe((response) => {
      this.myDonation = response.data
    })
    this.service.getUserDonatios().subscribe((res) => {
      this.donations = res.data

    })

  }

  // onSubmit() {
  //   this.loading = true
  //   console.log('Updated userData:', this.userData);
  //   this.deleteService.updateProfile(this.userData).subscribe((data) => {
  //     this.toster.success(data.message)
  //     this.checkoutForm.reset();
  //     this.loading = false
  //   })
  // }
  onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      this.loading = true
      console.log('Updated userData:', this.userData);
      this.deleteService.updateProfile(this.userData).subscribe((data) => {
        this.toster.success(data.message)
        this.checkoutForm.reset();
        this.loading = false
      })
    } else {
      // Handle the case where the form is invalid
    }
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
  // checkPasswordValidity(): void {
  //   const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   this.isPasswordValid = passwordPattern.test(this.newPasswordValue);
  // }
  changePassword(passwords: { old_password: string; new_password: string }) {
    this.loading = true
    this.deleteService.changePassword(passwords).subscribe((data) => {
      this.toster.success(data.message)
      this.loading = false
      this.passwordForm.reset()
    }, (error) => {
      this.toster.error(error.error.message)
      this.loading = false
      // console.error(error)
    }
    )
  }
    // Toggle visibility for Current Password
    toggleCurrentPasswordVisibility() {
      this.currentPasswordVisible = !this.currentPasswordVisible;
    }
  
    // Toggle visibility for New Password
    toggleNewPasswordVisibility() {
      this.newPasswordVisible = !this.newPasswordVisible;
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
    this.singleProduct = item

  }
  cancelOrders(id: string) {
    this.deleteService.cancelOrder(id).subscribe((response) => {
      console.log(response);

    })
  }


  // notification
  getNotifications() {
    this.service.getNotifications().subscribe(data => {
      this.notifications = data.data
    })
  }
  togglePopup(index: number, event: MouseEvent) {
    event.stopPropagation();
    if (this.showPopupIndex === index) {
      this.showPopupIndex = null;
    } else {
      this.showPopupIndex = index;
    }
  }
  deleteItem(item: any) {
    this.deleteService.deleteNotification(item.id).subscribe(response => {
      this.toster.success(response.message)
      this.getNotifications()
      this.showPopupIndex = null;
    }, error => {
      console.error('Error deleting notification:', error);
    });

  }
  @HostListener('document:click', ['$event'])
  closePopup(event: MouseEvent) {
    this.showPopupIndex = null;
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
}

logout() {
  Swal.fire({
    title: 'Are you sure you want to logout?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
      this.postService.postLogout().subscribe((response) => {
        // this.isAuthenticated = false;
        this.toster.success(response.message);
        localStorage.removeItem('user');
        this.router.navigate(['/main']).then(() => {
          window.location.reload();
        });
      });
    }
  });
}

}
