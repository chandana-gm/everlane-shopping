import { Component, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DeleteServiceService } from 'src/app/service/delete-service.service';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private service: GettingserviceService, private postService: PostServiceService, private deleteService: DeleteServiceService, private toastr: ToastrService) { }
  productDetail: any = [];
  total: any;
  quantity: number = 1;
  itemQuantity: any;
  decreptedTokenFromStorage = '';


  async ngOnInit() {

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);

      const decryptedToken = await this.postService.decryptData(user.token, 'token');
      console.log('decrypt', decryptedToken);
      this.decreptedTokenFromStorage = decryptedToken

      this.getCart();
    }
    this.deleteService.getWithoutRefresh().subscribe(() => {
      this.getCart();
      // this.wishlistData=data
    });
  }

  getCart() {
    
    this.service.getCart().subscribe(response => {
      if (response) {
        this.deleteService.getWithoutRefresh();
        this.productDetail = response.data[0].items;
        console.log(this.productDetail);
        this.total = response.data[0].total_price
        console.log(this.total);

      }

    })
  }

  incrementQuantity(item: any) {
    item.quantity++;
    this.postService.cartItemUpdateIncrement(item.id, this.decreptedTokenFromStorage).subscribe((data) => {
      console.log(data);
      this.refreshCart()
    })
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.postService.cartItemUpdatedecreament(item.id, this.decreptedTokenFromStorage).subscribe((data) => {
        console.log(data);
        this.refreshCart()

      })
    }
  }





  async removecartItem(item: any) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const decryptedToken = await this.postService.decryptData(user.token, 'token');
      console.log('item', item);
      console.log('decrypt', decryptedToken);

      this.deleteService.removeCartitem(item, decryptedToken).subscribe((data) => {
        console.log('item removed', data.message);
        this.deleteService.sendWithoutRefresh();
        this.deleteService.cartItemNumbers()
        this.toastr.success(data.message);

      });
    }



  }
  refreshCart() {
    this.deleteService.sendWithoutRefresh();
  }


  // copy link
  currentUrl: string = window.location.origin;
  toggleShareLink() {
    navigator.clipboard.writeText(`${this.currentUrl}/shopping/detailsPage/${16}`).then(() => {
      this.toastr.success('Link copied to clipboard!');
    }).catch(err => {
      this.toastr.error('Could not copy text');
    });
  }
  }

