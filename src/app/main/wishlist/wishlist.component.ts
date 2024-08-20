import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private service: GettingserviceService, private postServive: PostServiceService, private deleteService: DeleteServiceService,
    private toaster: ToastrService, private router: Router
  ) { }

  stockUpdate = true
  outofstockUpdate = false
  wishlistData: any

  // cartClick(event: Event) {
  //   const button = event.currentTarget as HTMLElement;
  //   if (button) {
  //     button.classList.add('clicked');

  //     const addedSpan = button.querySelector('span.added');
  //     if (addedSpan) {
  //       addedSpan.classList.add('show');
  //     }
  //     const removeSpan = button.querySelector('span.add-to-cart');
  //     if (removeSpan) {
  //       removeSpan.classList.add('hide');
  //     }
  //   }
  // }

  async ngOnInit() {
    window.scroll(0, 0)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const decryptedToken = await this.postServive.decryptData(user.token, 'token');
      console.log(decryptedToken);


      this.deleteService.getWithoutRefresh().subscribe(() => {
        this.getWishlist(decryptedToken);
        // this.wishlistData=data
      });


      this.getWishlist(decryptedToken);
    }
  }

  async getWishlist(token: any) {
    this.service.getWishlist(token).subscribe((data) => {
      console.log('wishlistdata', data);
      this.wishlistData = data.data;
      console.log(this.wishlistData, "wish");

    });
  }

  async removeItemFromWishlist(item: any) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const decryptedToken = await this.postServive.decryptData(user.token, 'token');

      this.deleteService.removeItemFromWishlist(item, decryptedToken).subscribe((data) => {
        this.toaster.success(data.message);
        this.getWishlist(decryptedToken);
      });
    }
  }

  redirectToDetailPage(item: any) {
    console.log(item.product);
    this.router.navigate(['shopping/detailsPage', item.product])

  }

  // async wishlistItemToCart(item: any) {
  //   const storedUser = localStorage.getItem('user');

  //   if (storedUser) {
  //     const user = JSON.parse(storedUser);
  //     const decryptedToken = await this.postServive.decryptData(user.token, 'token');
  //     this.deleteService.removeItemFromWishlist(item, decryptedToken).subscribe(
  //       (data: any) => {
  //         this.getWishlist(decryptedToken);
  //       },
  //       (error: any) => {
  //         console.error('Error:', error);
  //         this.toaster.error('Failed to remove item from wishlist.');
  //       }
  //     );
  //   }
  // }

  async addToCart(item: any, product: any) {
    const stored = localStorage.getItem('user');
    if (stored) {
      const data = JSON.parse(stored);
      const decryptedToken = await this.postServive.decryptData(data.token, 'token');
      console.log('decrpt', decryptedToken);
      console.log('carted', item);
      this.postServive.postCart(item, decryptedToken).subscribe((data: any) => {

        console.log('response', data);
        this.toaster.success("item added to cart");
        this.removeItemFromWishlist(product)

      },
        (error: any) => {
          console.error('Error:', error);
          this.toaster.error(data.message);

        }
      );


    }

  }
}