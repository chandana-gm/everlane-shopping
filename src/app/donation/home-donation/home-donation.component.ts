import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-donation',
  templateUrl: './home-donation.component.html',
  styleUrls: ['./home-donation.component.css']
})
export class HomeDonationComponent implements  OnInit {
  disasterForm!: FormGroup;
  constructor(private fb: FormBuilder,private toastr:ToastrService) {}
  ngOnInit(): void {
    window.scroll(0,0)
    this.disasterForm = this.fb.group({
      username: ['', Validators.required],
      id: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
      place: ['', Validators.required],
      disasterTypes: ['', Validators.required],
      men: ['', [Validators.required, Validators.min(1)]],
      women: ['', [Validators.required, Validators.min(1)]],
      kid: ['', [Validators.required, Validators.min(1)]],
      additionalNotes: [''],
    });
    
  }


  onSubmit() {
    if (this.disasterForm.valid) {
      console.log('Form Submitted!', this.disasterForm.value);
      this.toastr.success('Registration successful!', 'Success');
    } else {
      this.toastr.error('Registration failed. Please try again.');
      console.log('Form is not valid');
    }
    this.disasterForm.reset()
  }
}
