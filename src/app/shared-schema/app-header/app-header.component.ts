import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {



  isAuthenticated = false
  authenticatedUser = ''
  dropdownOpen = false;



  constructor( private service: PostServiceService, private route: Router) {

  }


  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.authenticatedUser = user.username
      this.isAuthenticated = true
      const decryptedToken = this.service.decryptData(user.token, 'token');
    } else {
      console.error('not authenticated');
      this.isAuthenticated = false; 
    }

  }
  redirectToRegister() {
    this.route.navigate(['/auth/register'])
  }
  redirectToProfile() {
    this.route.navigate(['/main/profile'])
  }
  redirectToDonate(){
    this.route.navigate(['/donation/donation%home'])
  }
  redirectToWishlist(){
    this.route.navigate(['/main/wishlist'])
  }
  redirectToCart(){
    this.route.navigate(['/shopping/cart'])
  }

  toggleDropdown(state: boolean) {
    this.dropdownOpen = state;
  }

}
