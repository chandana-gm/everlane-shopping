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

  constructor(
    private service: GettingserviceService, 
    private postServive: PostServiceService, 
    private deleteService: DeleteServiceService,
    private toaster: ToastrService, 
    private router: Router
  ) { }

  stockUpdate = true
  outofstockUpdate = false
  wishlistData: any
  loading:boolean=true


  async ngOnInit() {
    window.scroll(0, 0)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const decryptedToken = await this.postServive.decryptData(user.token, 'token');
      console.log(decryptedToken);
      this.deleteService.getWithoutRefresh().subscribe(() => {
        this.getWishlist();
      });
      this.getWishlist();
    }
    else{
      this.loading=false
    }
  }

  async getWishlist() {
    this.service.getWishlist().subscribe((data) => {
      this.wishlistData = data.data;
      this.loading=false
    });
  }

  async removeItemFromWishlist(item: any) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const decryptedToken = await this.postServive.decryptData(user.token, 'token');

      this.deleteService.removeItemFromWishlist(item, decryptedToken).subscribe((data) => {
        this.toaster.success(data.message);
        this.getWishlist();
      });
    }
  }

  redirectToDetailPage(item: any) {
    console.log(item.product);
    this.router.navigate(['shopping/detailsPage', item.product])

  }

  async addToCart(item: any, product: any) {
    const stored = localStorage.getItem('user');
    if (stored) {
      const data = JSON.parse(stored);
      const decryptedToken = await this.postServive.decryptData(data.token, 'token');
      console.log('decrpt', decryptedToken);
      console.log('carted', item);
    }

  }
}