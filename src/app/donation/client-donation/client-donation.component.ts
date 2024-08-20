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
export class ClientDonationComponent  implements OnInit{
  [x: string]: any;
  disasterList:any[]=[]
  donationForm!:FormGroup
  images: string[] = [];

  
  
  constructor(private fb:FormBuilder,private getService:GettingserviceService ,private postService:PostServiceService,private toastr:ToastrService){}
 
 async ngOnInit() {
    this.donationForm = this.fb.group({
      disaster: ['', Validators.required],
      images: ['', Validators.required],
      men_dresses: [0, [Validators.required, Validators.min(0)]],
      women_dresses: [0, [Validators.required, Validators.min(0)]],
      kid_dresses: [0, [Validators.required, Validators.min(0)]],
      pickup_location: ['', Validators.required],
      donated_on:['', Validators.required],
      doner_name:['', Validators.required]
     
    });
    const storedUser = localStorage.getItem('user');
    console.log(storedUser);
        if (storedUser) {
        const user = JSON.parse(storedUser);
        const decryptedToken = await this.postService.decryptData(user.token, 'token');
        console.log('decrypt',decryptedToken );
    this.getService.getDisasterList(decryptedToken).subscribe((Response)=>{

      this.disasterList=Response.data
    console.log(this.disasterList);
    
      

      
      
    })

  }
}
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.images = [];
      const filesArray = Array.from(input.files);
      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e);
          
          this.images.push(e.target.result); 
        };
        reader.readAsDataURL(file);
      });
      this.donationForm.patchValue({
        images: filesArray
      });
      this.donationForm.get('images')?.updateValueAndValidity();
    }
  }


 async onSubmit() {
    if (this.donationForm.valid) {
     
      console.log(this.donationForm.value);
      const formData=this.donationForm.value
      const id=formData.disaster
      console.log(id);
      
      // const storedUser = localStorage.getItem('user');
      // if (storedUser) {
      //   const user = JSON.parse(storedUser);
      //   const decryptedToken = await this.postService.decryptData(user.token,'token');
      //   console.log('wwnvjssvn',formData,decryptedToken);
        
          this.postService.postDonation(formData,id).subscribe((data:any)=>{
            console.log('response',data);
            
         this.toastr.success('Registration successful!', data);
    });
  }
}
  
}

  