import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DeleteServiceService } from 'src/app/service/delete-service.service';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  constructor(private service: GettingserviceService, private postServive: PostServiceService, private deleteService:DeleteServiceService,
    private toaster:ToastrService
  ) { }

  stockUpdate = true
  outofstockUpdate = false
  wishlistData:any

  cartClick(event: Event) {
    const button = event.currentTarget as HTMLElement;
    if (button) {
      button.classList.add('clicked');

      const addedSpan = button.querySelector('span.added');
      if (addedSpan) {
        addedSpan.classList.add('show');
      }
      const removeSpan = button.querySelector('span.add-to-cart');
      if (removeSpan) {
        removeSpan.classList.add('hide');
      }
    }
  }

  async ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const decryptedToken = await this.postServive.decryptData(user.token, 'token');
      
    
      this.deleteService.getWithoutRefresh().subscribe(() => {
        this.getWishlist(decryptedToken); 
      });

 
      this.getWishlist(decryptedToken);
    }
  }

  async getWishlist(token: any) {
    this.service.getWishlist(token).subscribe((data) => {
      console.log('wishlistdata', data);
      this.wishlistData = data.data;
    });
  }

  async removeItemFromWishlist(item: any) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const decryptedToken = await this.postServive.decryptData(user.token, 'token');
      
      this.deleteService.removeItemFromWishlist(item, decryptedToken).subscribe((data) => {
        console.log('wishlistdata remove response', data.message);
        this.toaster.success(data.message);
        this.getWishlist(decryptedToken); 
      });
    }
  }
}