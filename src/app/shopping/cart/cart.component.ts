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

  async ngOnInit() {

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);

      const decryptedToken = await this.postService.decryptData(user.token, 'token');
      console.log('decrypt', decryptedToken);

      this.service.getCart(decryptedToken).subscribe(response => {
        //   console.log( 'cart-response',data);
        //   this.productDetail=data.data
        //  console.log(this.productDetail);
        if (response) {
          this.productDetail = response.data[0].items;
          console.log(this.productDetail);
          this.total = response.data[0].total_price
          console.log(this.total);

        }

      })
    }




  }

  deleteCart(item:any) {

    
this.postService.deleteCart(item).subscribe((data)=>{

  console.log('deleted',data)
});
  


  }

}
