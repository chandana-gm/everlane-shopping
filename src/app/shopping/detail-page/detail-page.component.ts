import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteServiceService } from 'src/app/service/delete-service.service';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';



@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {
  singleProduct: any;
  productId: any;
  size: any
  fullData: any[] = []
  allData: any
  isWishlisted: boolean = false;
  selectedSize: any
  loading: boolean = true
  isToastVisible: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private service: GettingserviceService, private postservice: PostServiceService, private toster: ToastrService, private deleteService: DeleteServiceService) { }

  ngOnInit() {
    window.scroll(0,0)
    this.productId = this.route.snapshot.paramMap.get('id');

    this.getSingleProduct();

  }
  getSingleProduct() {
    this.service.getAllProducts(this.productId).subscribe((data) => {
      this.singleProduct = data.data
      this.loading = false
      this.size = this.singleProduct.items
      const sizeOrder = ['S', 'M', 'L', 'XL'];
    this.size.sort((a: { size: string; }, b: { size: string; }) => {
      return sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size);
    });
      this.getWishlist()
      this.checkIfWishlisted()

    })
  }
  addItemToWishlist(id: any) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.postservice.postWishlist(id).subscribe((data) => {
        this.toster.success(data.message)
        this.isWishlisted = true;
      })
    } else {
      this.router.navigate(['/auth/register'])
    }
  }


  getWishlist() {
    this.service.getWishlist().subscribe((data) => {
      this.allData = data.data
      console.log(this.allData, "alldata");
      this.checkIfWishlisted()

    });
  }
  checkIfWishlisted() {
    this.isWishlisted = this.allData.some((wish: any) => wish.product === this.singleProduct.id);

  }
  addToCart(item: any) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log('cart clicked');
      this.postservice.postCart(item, this.selectedSize).subscribe((data: any) => {
        this.toster.success(data.message);
        this.deleteService.cartItemNumbers()

      },
        (error: any) => {
          this.toster.error("select size");

        }
      );

    } else {
      this.router.navigate(['/auth/register'])
    }
  }
  selectSize(item: any) {
    this.selectedSize = item.size 
  }

}

