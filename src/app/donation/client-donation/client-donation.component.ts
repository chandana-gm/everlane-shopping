// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { GettingserviceService } from 'src/app/service/gettingservice.service';
// import { PostServiceService } from 'src/app/service/post-service.service';

// @Component({
//   selector: 'app-client-donation',
//   templateUrl: './client-donation.component.html',
//   styleUrls: ['./client-donation.component.css']
// })
// export class ClientDonationComponent  implements OnInit{
//   [x: string]: any;
//   disasterList:any[]=[]
//   donationForm!:FormGroup
//   images: string[] = [];

  
  
//   constructor(private fb:FormBuilder,private getService:GettingserviceService ,private postService:PostServiceService,private toastr:ToastrService){}
 
//  async ngOnInit() {
//     this.donationForm = this.fb.group({
//       disaster: ['', Validators.required],
//       images: ['', Validators.required],
//       men_dresses: [0, [Validators.required, Validators.min(0)]],
//       women_dresses: [0, [Validators.required, Validators.min(0)]],
//       kid_dresses: [0, [Validators.required, Validators.min(0)]],
//       pickup_location: ['', Validators.required],
//       donated_on:['', Validators.required],
//       doner_name:['', Validators.required]
     
//     });
//     const storedUser = localStorage.getItem('user');
//     console.log(storedUser);
//         if (storedUser) {
//         const user = JSON.parse(storedUser);
//         const decryptedToken = await this.postService.decryptData(user.token, 'token');
//         console.log('decrypt',decryptedToken );
//     this.getService.getDisasterList(decryptedToken).subscribe((Response)=>{

//       this.disasterList=Response.data
//     console.log(this.disasterList);
    
      

      
      
//     })

//   }
// }
//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files) {
//       this.images = [];
//       const filesArray = Array.from(input.files);
//       filesArray.forEach(file => {
//         const reader = new FileReader();
//         reader.onload = (e: any) => {
//           console.log(e);
          
//           this.images.push(e.target.result); 
//         };
//         reader.readAsDataURL(file);
//       });
//       this.donationForm.patchValue({
//         images: filesArray
//       });
//       this.donationForm.get('images')?.updateValueAndValidity();
//     }
//   }


// //  async onSubmit() {
// //     if (this.donationForm.valid) {
     
// //       console.log(this.donationForm.value);
// //       const formData=this.donationForm.value
// //       const id=formData.disaster
// //       console.log(id);
      
// //                this.postService.postDonation(formData,id).subscribe((data:any)=>{
// //             console.log('response',data);
            
// //          this.toastr.success('Registration successful!', data);
// //     });
// //   }
// // }
// async onSubmit() {
//   if (this.donationForm.valid) {
//     const formData = new FormData();

//     // Append other form fields
//     formData.append('disaster', this.donationForm.get('disaster')?.value);
//     formData.append('men_dresses', this.donationForm.get('men_dresses')?.value);
//     formData.append('women_dresses', this.donationForm.get('women_dresses')?.value);
//     formData.append('kid_dresses', this.donationForm.get('kid_dresses')?.value);
//     formData.append('pickup_location', this.donationForm.get('pickup_location')?.value);
//     formData.append('donated_on', this.donationForm.get('donated_on')?.value);
//     formData.append('doner_name', this.donationForm.get('doner_name')?.value);

//     // Append images to the FormData
//     const filesArray = this.donationForm.get('images')?.value;
//     filesArray.forEach((file: File, index: number) => {
//       formData.append(`images[${index}]`, file);
//     });

//     const id = this.donationForm.get('disaster')?.value;
//     console.log(id);
//     console.log(formData);
    
//     this.postService.postDonation(formData, id).subscribe(
//       (data: any) => {
//         console.log('response', data);
//         this.toastr.success('Registration successful!', data);
//       },
//       (error) => {
//         console.error('Upload error', error);
//         this.toastr.error('Failed to upload donation!', error.message);
//       }
//     );
//   }
// }
// }
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

  constructor(
    private fb: FormBuilder,
    private getService: GettingserviceService,
    private postService: PostServiceService,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    this.donationForm = this.fb.group({
      disaster: ['', Validators.required],
      images: [null, Validators.required],
      men_dresses: [0, [Validators.required, Validators.min(0)]],
      women_dresses: [0, [Validators.required, Validators.min(0)]],
      kids_dresses: [0, [Validators.required, Validators.min(0)]],
      pickup_location: ['', Validators.required],
      donated_on: ['', Validators.required],
      doner_name: ['', Validators.required]
    });

    // const storedUser = localStorage.getItem('user');
    // if (storedUser) {
    //   const user = JSON.parse(storedUser);
    //   const decryptedToken = await this.postService.decryptData(user.token, 'token');
    //   this.getService.getDisasterList(decryptedToken).subscribe((response) => {
    //     this.disasterList = response.data;
    //   });
    // }
    this.getService.getDisasterList().subscribe((response) => {
          this.disasterList = response.data;
        });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const filesArray = Array.from(input.files);
      this.images = [];
      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
      // console.log(this.images);
      
      this.donationForm.patchValue({
        images: filesArray
      });
    }
  }

  async onSubmit() {
    if (this.donationForm.valid) {
      const formData = new FormData();

        formData.append('disaster', this.donationForm.get('disaster')?.value);
        formData.append('men_dresses', this.donationForm.get('men_dresses')?.value);
        formData.append('women_dresses', this.donationForm.get('women_dresses')?.value);
        formData.append('kid_dresses', this.donationForm.get('kid_dresses')?.value);
        formData.append('pickup_location', this.donationForm.get('pickup_location')?.value);
        formData.append('donated_on', this.donationForm.get('donated_on')?.value);
        formData.append('doner_name', this.donationForm.get('doner_name')?.value);
    


      const filesArray = this.donationForm.get('images')?.value;
      console.log(filesArray);
      
      if (filesArray) {
        filesArray.forEach((file: File, index: number) => {
          formData.append(`images[${index}]`, file);
          console.log(filesArray);
          
        });
      }

      const disasterId = this.donationForm.get('disaster')?.value;
      console.log('abc',disasterId);
      
      this.postService.postDonation(formData, disasterId).subscribe(
        (data: any) => {

          console.log(data,'response');
          
          this.toastr.success('Registration successful!',data.message);
          // this.toastr.error('Registration successful!',data.error.images[0]);
        },
        (error) => {
        
          // this.toastr.error('Failed to upload donation!',error.error.errors.images[0]);
          if (error.error.errors && error.error.errors.images) {
            this.toastr.error(error.error.errors.images[0], 'Image Upload Error');
          } else {
            this.toastr.error('Failed to upload donation!', error.message);
          }
        }
      );
    }
  }
}

  