import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeleteServiceService } from 'src/app/service/delete-service.service';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  isAuthenticated = false;
  authenticatedUser = '';
  dropdownOpen = false;
  cartItems: any[] = [];
  decryptedTokenFromStorage: string | undefined;
  cartLength: any;

  constructor(
    private service: PostServiceService, 
    private route: Router, 
    private getService: GettingserviceService, 
    private deleteService: DeleteServiceService
  ) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.authenticatedUser = user.username;
      this.isAuthenticated = true;
      const decryptedToken = this.service.decryptData(user.token, 'token');
      this.decryptedTokenFromStorage = decryptedToken;


      this.deleteService.getCartItemNumbers().subscribe((cartLength) => {
        this.cartLength = cartLength;
        this.getCartItemNumbers(); 
      });

      
      this.getCartItemNumbers();

    } else {
      console.error('Not authenticated');
      this.getCartItemNumbers(); 
    }
  }

  getCartItemNumbers() {
    this.getService.getCart().subscribe((response) => {
      this.cartItems = response.data[0].items;
      const updatedCartLength = this.cartItems.length;
      this.refreshCart(updatedCartLength);
    });
  }

  refreshCart(cartLength: number) {
    this.deleteService.cartItemNumbers(cartLength); 
  }

  redirectToRegister() {
    this.route.navigate(['/auth/register']);
  }

  redirectToProfile() {
    this.route.navigate(['/main/profile']);
  }

  redirectToDonate() {
    this.route.navigate(['/donation/donation%home']);
  }

  redirectToWishlist() {
    this.route.navigate(['/main/wishlist']);
  }

  redirectToCart() {
    this.route.navigate(['/shopping/cart']);
  }

  toggleDropdown(state: boolean) {
    this.dropdownOpen = state;
  }

  async logout() {
    console.log(this.decryptedTokenFromStorage, 'token');
    await this.service.postLogout(this.decryptedTokenFromStorage).subscribe((response) => {
      console.log(response);
      window.location.reload();
      this.isAuthenticated = false;
      localStorage.removeItem('user');
    });
  }
}
