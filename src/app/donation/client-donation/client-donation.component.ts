
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-client-donation',
  templateUrl: './client-donation.component.html',
  styleUrls: ['./client-donation.component.css']
})
export class ClientDonationComponent implements OnInit {
  disasterList: any[] = [];
  donationForm!: FormGroup;
  images: string[] = [];
  // address: any[] = []
  pickup: any[] = []
  dis: any
  isProcessing = false;

  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private getService: GettingserviceService,
    private postService: PostServiceService,
    private toastr: ToastrService
  ) { }

  async ngOnInit() {
    this.donationForm = this.fb.group({
      doner_name: ['', Validators.required],
      disaster: ['', Validators.required],
      images: [null, Validators.required],
      men_dresses: [0, [Validators.required, Validators.min(0)]],
      women_dresses: [0, [Validators.required, Validators.min(0)]],
      kids_dresses: [0, [Validators.required, Validators.min(0)]],
      pickup_location: ['', Validators.required],
      donated_on: ['', Validators.required],

    });
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const username = user.username
      console.log(username);
      this.donationForm.patchValue({
        doner_name: username
      });
      this.getService.getPickup().subscribe((res) => {
        console.log('pick', res);
        this.pickup = res.data

      })


    }

    this.getService.getDisasterList().subscribe((response) => {
      console.log(response);

      this.disasterList = response.data;

    });
    // this.getService.getAddress().subscribe((data) => {
    //   console.log(data, 'address');
    //   this.address = data.data
    // }
    // )
  }

  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files) {
  //     const filesArray = Array.from(input.files);

  //     filesArray.forEach(file => {
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         this.images.push(e.target.result);
  //       };
  //       reader.readAsDataURL(file);
  //     });
  //     // console.log(this.images);

  //     this.donationForm.patchValue({
  //       images: filesArray
  //     });
  //   }
  // }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const filesArray = Array.from(input.files);

      filesArray.forEach(file => {
        this.selectedFiles.push(file);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });

      this.donationForm.patchValue({
        images: this.selectedFiles
      });
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    this.selectedFiles.splice(index, 1);
    this.donationForm.patchValue({
      images: this.selectedFiles
    });
  }

  async onSubmit() {
    if (this.donationForm.valid) {
      const formData = new FormData();

      formData.append('disaster', this.donationForm.get('disaster')?.value);
      formData.append('men_dresses', this.donationForm.get('men_dresses')?.value);
      formData.append('women_dresses', this.donationForm.get('women_dresses')?.value);
      formData.append('kids_dresses', this.donationForm.get('kids_dresses')?.value);
      formData.append('pickup_location', this.donationForm.get('pickup_location')?.value);
      formData.append('donated_on', this.donationForm.get('donated_on')?.value);
      formData.append('doner_name', this.donationForm.get('doner_name')?.value);



      const filesArray = this.donationForm.get('images')?.value;
      console.log(filesArray);
      if (this.selectedFiles.length > 0) {
        this.selectedFiles.forEach((file, index) => {
          formData.append('images', file);
        });
      }


      const disasterId = this.donationForm.get('disaster')?.value;
      console.log('abc', disasterId);
      this.isProcessing = true;
      this.postService.postDonation(formData, disasterId).subscribe(
        (data: any) => {
          this.isProcessing = false;
          console.log(data, 'response');
          if (data.status == 'success') {
            this.toastr.success(data.message);
            
          }
          else if (data.status == 'failed') {
           this.toastr.info(data.message);
          }
        },
        (error) => {
          this.isProcessing = false;
          // this.toastr.error('Failed to upload donation!',error.error.errors.images[0]);
          if (error.error.errors && error.error.errors.images) {
            this.toastr.error(error.error.errors.images[0], 'Image Upload Error');
          } else {
            this.toastr.error('Failed to upload donation!', error.message);
          }
        }
      );
    }
    else {
      this.markAllFieldsAsTouched();
    }
  }
  private markAllFieldsAsTouched(): void {
    Object.keys(this.donationForm.controls).forEach(field => {
      const control = this.donationForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
  onFormClick(): void {
    this.markAllFieldsAsTouched();
  }

  onDisasterChange(event: Event) {
    const selectedDisasterId = (event.target as HTMLSelectElement).value;
    console.log(selectedDisasterId);
    this.dis = this.disasterList.find(disaster => disaster.id === +selectedDisasterId);

  }
}

