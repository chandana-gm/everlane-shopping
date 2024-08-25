import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-home-donation',
  templateUrl: './home-donation.component.html',
  styleUrls: ['./home-donation.component.css']
})
export class HomeDonationComponent implements OnInit {
  disasterForm!: FormGroup;
  authenticated = false

  constructor(private fb: FormBuilder, 
    private toastr: ToastrService, 
    private postService: PostServiceService, 
    private router: Router) { }
    
  ngOnInit(): void {
    window.scroll(0, 0)
    const token = localStorage.getItem('user')
    if (token) {
      this.authenticated = true
    }
    this.disasterForm = this.fb.group({


      name: ['', Validators.required],
      description: [''],
      adhar: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
      location: ['', Validators.required],
      required_men_dresses: ['', [Validators.required, Validators.min(0)]],
      required_women_dresses: ['', [Validators.required, Validators.min(0)]],
      required_kids_dresses: ['', [Validators.required, Validators.min(0)]]
    });

  }


  async onSubmit() {
    if (this.disasterForm.valid) {
      const formData = this.disasterForm.value
      console.log('Form Submitted!', this.disasterForm.value);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        // const username=user.username
        // this.disasterForm.patchValue({

        // })
        const decryptedToken = await this.postService.decryptData(user.token, 'token');
        this.postService.postDonationReg(formData, decryptedToken).subscribe((data: any) => {
          console.log('response', data);

          this.toastr.success('Registration successful!', data.message);
          this.router.navigate(['/donation/donation%25home']);

        });
      }
      else {
        this.toastr.error('Registration failed. Please try again.');
        console.log('Form is not valid');
      }
      this.disasterForm.reset()
    }
    else {
      this.markAllFieldsAsTouched();
    }
  }
  private markAllFieldsAsTouched(): void {
    Object.keys(this.disasterForm.controls).forEach(field => {
      const control = this.disasterForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
  onFormClick(): void {
    this.markAllFieldsAsTouched();
  }

  redirectToDonationPage() {
    const token = localStorage.getItem('user')
    if (token) {
      this.router.navigate(['/donation/client_donat'])
    }
    else {
      this.router.navigate(['/auth/register'])
    }
  }
}
