import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteServiceService } from 'src/app/service/delete-service.service';
import { ToastrService } from 'ngx-toastr';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-shopping-details',
  templateUrl: './shopping-details.component.html',
  styleUrls: ['./shopping-details.component.css']
})
export class ShoppingDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: GettingserviceService, private router: Router, private postService: PostServiceService, private deleteService: DeleteServiceService, private toastr: ToastrService) { }
  bannerSeason: any;
  seasonProducts: any;
  isLoading = false
  cartedItems: any
  incartActive = false
  isWishlisted = false
  searchTerm: string = '';
  wishlistData: any

  ngOnInit() {
    this.bannerSeason = this.route.snapshot.paramMap.get('name');
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['product'] || null;
      if (this.searchTerm != null) {
        this.fetchProducts(this.searchTerm)
        this.wishlisted()
      };
      this.service.getWishlist().subscribe((wishlistResponse) => {
        this.wishlistData = wishlistResponse.data;
        this.wishlisted()
      });
    });




    // categories api //
    if (this.bannerSeason === 'Shirts') {
      this.service.getShirtCategory().subscribe((data) => {
        this.seasonProducts = data.data
        console.log(this.seasonProducts);
        this.isLoading = true;
        this.wishlisted()
      });
    } else if (this.bannerSeason === 'Jeans Men') {
      this.service.getJeansMenCategory().subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading = true;
        this.wishlisted()

      });
    } else if (this.bannerSeason === 'T shirts') {
      this.service.getTShirtMenCategory().subscribe((data) => {
        this.seasonProducts = data.data
        this.wishlisted()
        this.isLoading = true;
      });
    } else if (this.bannerSeason === 'Trousers') {
      this.service.getTrousersCategory().subscribe((data) => {
        this.seasonProducts = data.data
        this.wishlisted()
        this.isLoading = true;
      });
    } else if (this.bannerSeason === 'Shorts') {
      this.service.getShortsCategory().subscribe((data) => {
        this.seasonProducts = data.data
        this.wishlisted()
        this.isLoading = true;
      });
    } else if (this.bannerSeason === 'kurtis') {
      this.service.getKurtiesWomenCategory().subscribe((data) => {
        this.seasonProducts = data.data
        this.wishlisted()
        this.isLoading = true;
      });
    } else if (this.bannerSeason === 'T shirts woman') {
      this.service.getTShirtWimenCategory().subscribe((data) => {
        this.seasonProducts = data.data
        this.wishlisted()
        this.isLoading = true;
      });
    } else if (this.bannerSeason === 'Jeans') {
      this.service.getJeansWomenCategory().subscribe((data) => {
        this.seasonProducts = data.data
        this.wishlisted()
        this.isLoading = true;
      });
    } else if (this.bannerSeason === 'skirts') {
      this.service.getSkirtsWomenCategory().subscribe((data) => {
        this.seasonProducts = data.data
        this.wishlisted()
        this.isLoading = true;
      });
    }

    // seasons //
    if (this.bannerSeason == 'season_winter') {
      this.service.getWinterSeasonProducts().subscribe((data) => {
        this.seasonProducts = data.data
        this.wishlisted()
        this.isLoading = true
      });
    }
    else if (this.bannerSeason == 'season_summer') {
      this.service.getSummerSeasonProducts().subscribe((data) => {
        this.seasonProducts = data.data
        this.wishlisted()
        this.isLoading = true
      });
    }
    else if (this.bannerSeason == 'season_mansoon') {
      this.service.getMansoonSeasonProducts().subscribe((data) => {
        this.seasonProducts = data.data
        this.wishlisted()
        this.isLoading = true
      });
    }
    else if (this.bannerSeason == 'season_autumn') {
      this.service.getAutumnSeasonProducts().subscribe((data) => {
        this.seasonProducts = data.data
        this.wishlisted()
        this.isLoading = true
      });
    }
  }

  wishlisted() {
    this.seasonProducts = this.seasonProducts.map((product: any) => {
      const isWishlisted = this.wishlistData.some((wish: any) => wish.product === product.id);
      return { ...product, isWishlisted };
    });
  }

  fetchProducts(query: string) {
    this.service.searchProducts(query).subscribe((data) => {
      this.seasonProducts = data.data
      console.log(data,"searched data");
      
      this.wishlisted()
    })
  }



  // post cart
  // async cartedItem(item: any) {
  //   const stored = localStorage.getItem('user');
  //   if (stored) {
  //     const data = JSON.parse(stored);
  //     const decryptedToken = await this.postService.decryptData(data.token, 'token');
  //     console.log('decrpt', decryptedToken);
  //     console.log('carted', item.id);
  //     this.postService.postCart(item.id, decryptedToken).subscribe((data: any) => {

  //       console.log('response', data);
  //       this.toastr.success(data.message);

  //     },
  //       (error: any) => {
  //         console.error('Error:', error);
  //         this.toastr.error(data.message);

  //       }
  //     );


  //   }


  // }

  redirectToDetailPage(id: any) {
    this.router.navigate(['/shopping/detailsPage', id])
  }

  async wishlistEvent(item: any) {
    const previousState = item.isWishlisted;
    try {
      if (previousState) {
        // await this.deleteWishlistItem(item);
      } else {
        const wishlistResponseId = await this.addWishlistItem(item);
        item.wishlistResponseId = wishlistResponseId;

      }
      item.isWishlisted = !previousState;

    } catch (error) {
      console.error('Error decrypting token', error);
      item.isWishlisted = previousState;
    }
  }

  async deleteWishlistItem(item: any) {
    try {
      this.deleteService.removeItemFromWishlist(item).subscribe((data) => {
        this.toastr.success(data.message);
      });
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  }

   addWishlistItem(item: any) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
     this.postService.postWishlist(item.id).subscribe(data=>{
      console.log(data);
      this.toastr.success(data.message)
     });
   
    } else
      this.router.navigate(['/auth/register'])
  }

}
