import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-donation',
  templateUrl: './client-donation.component.html',
  styleUrls: ['./client-donation.component.css']
})
export class ClientDonationComponent  implements OnInit{
  imagePreview: string | ArrayBuffer | null = null;
  donationForm!:FormGroup
  constructor(private fb:FormBuilder){}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        this.imagePreview = reader.result;
      };

      reader.readAsDataURL(file);
    }
    
  }
  ngOnInit(): void {
    this.donationForm = this.fb.group({
      disasterSelect: ['', Validators.required],
      uploadImage: [null, Validators.required],
      men: [0, [Validators.required, Validators.min(0)]],
      women: [0, [Validators.required, Validators.min(0)]],
      kid: [0, [Validators.required, Validators.min(0)]],
      pickupLocation: ['', Validators.required]
    });
  }


  onSubmit(): void {
    if (this.donationForm.valid) {
     
      console.log(this.donationForm.value);
    }
}
}
