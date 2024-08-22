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
  addressMessage:any
  showAddressForm: boolean = false;
  myDonation:any[]=[]


  constructor(private service: GettingserviceService, private fb: FormBuilder, private deleteService: DeleteServiceService, private toster: ToastrService, private postService: PostServiceService) {
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

  ngOnInit(): void {
    window.scroll(0, 0);
    this.getUserProfile();
    this.getAddress()
    this.deleteService.getWithoutRefresh().subscribe(()=>{
      this.getAddress()
    })
    this.service.getMyDonation().subscribe((response)=>
    {
      console.log('data',response);
      this.myDonation=response.data
      
      
    })

  }

  onSubmit() {
    console.log('Updated userData:', this.userData);
    this.deleteService.updateProfile(this.userData).subscribe((data) => {
      console.log(data);
      this.toster.success(data.message)
      this.checkoutForm.reset();

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

  changePassword(passwords: { old_password: string; new_password: string }) {
    this.deleteService.changePassword(passwords).subscribe((data) => {
      this.toster.success(data.message)

    })
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


  
}
