import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  searchTerm: string = '';
  @Output() searchTermChange: EventEmitter<string> = new EventEmitter<string>();
  

  constructor(
    private service: PostServiceService,
    private route: ActivatedRoute,
    private toster:ToastrService,
    private router: Router,
    private getService: GettingserviceService,
    private deleteService: DeleteServiceService
  ) { }

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.authenticatedUser = user.username;
      this.isAuthenticated = true;
      const decryptedToken = this.service.decryptData(user.token, 'token');
      this.decryptedTokenFromStorage = decryptedToken;
      
      this.deleteService.getCartItemNumbers().subscribe(() => {
        this.getCartLength()
        
      });
      this.getCartLength()




    } else {
      console.error('Not authenticated');
      // this.getCartItemNumbers(); 
    }
  }
  getCartLength() {
    this.getService.getCart().subscribe((data) => {
      this.cartLength = data.data[0].items.length
      console.log(this.cartLength, 'data from header');
    })
  }

  SearchValue() {
    if (this.searchTerm) {
      this.router.navigate(['shopping/shoppingDetails', this.searchTerm], {
        queryParams: { product: this.searchTerm }
      });
    }
  }




  redirectToRegister() {
    this.router.navigate(['/auth/register']);
  }

  redirectToProfile() {
    this.router.navigate(['/main/profile']);
  }

  redirectToDonate() {
    this.router.navigate(['/donation/donation%home']);
  }

  redirectToWishlist() {
    this.router.navigate(['/main/wishlist']);
  }

  redirectToCart() {
    this.router.navigate(['/shopping/cart']);
  }

  toggleDropdown(state: boolean) {
    this.dropdownOpen = state;
  }

   logout() {
     this.service.postLogout().subscribe((response) => {
      this.isAuthenticated = false;
      this.toster.success(response.message)
      localStorage.removeItem('user');
      this.router.navigate(['/main']).then(() => {
        window.location.reload();
      });
    });
  }
  
}
