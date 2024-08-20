import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DeleteServiceService } from 'src/app/service/delete-service.service';
import { GettingserviceService } from 'src/app/service/gettingservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any = {};
  currentSection: string = 'section1';

  constructor(private service: GettingserviceService, private fb: FormBuilder, private deleteService: DeleteServiceService, private toster: ToastrService) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.getUserProfile();
  }

  onSubmit() {
    console.log('Updated userData:', this.userData);
    this.deleteService.updateProfile(this.userData).subscribe((data) => {
      console.log(data);
      this.toster.success(data.message)

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

  getUserProfile() {
    this.service.getProfile().subscribe((data) => {
      this.userData = data.data;
      console.log(this.userData);
    });
  }
}
