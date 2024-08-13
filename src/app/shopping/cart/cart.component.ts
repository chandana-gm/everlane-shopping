import { Component } from '@angular/core';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private service: GettingserviceService, private postService: PostServiceService) { }
  productDetail: any = []
  total: any
  quantity: number = 1;
  decreptedTokenFromStorage=''


  async ngOnInit() {

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);

      const decryptedToken = await this.postService.decryptData(user.token, 'token');
      console.log('decrypt', decryptedToken);
      this.decreptedTokenFromStorage=decryptedToken

      this.service.getCart(decryptedToken).subscribe(response => {
        if (response) {
          this.productDetail = response.data[0].items;
          console.log(this.productDetail);
          this.total = response.data[0].total_price
          console.log(this.total);
        }

      })
    }

  }


  incrementQuantity(item: any) {
    item.quantity++;
    this.postService.cartItemUpdateIncrement(item.id,this.decreptedTokenFromStorage).subscribe((data)=>{
      console.log(data);
      
    })
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.postService.cartItemUpdatedecreament(item.id,this.decreptedTokenFromStorage).subscribe((data)=>{
        console.log(data);
        
      })
    }
  }

  deleteCart(item:any) {

  }

}
