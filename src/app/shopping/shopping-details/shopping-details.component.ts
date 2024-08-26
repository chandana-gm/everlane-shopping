import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteServiceService } from 'src/app/service/delete-service.service';
import { ToastrService } from 'ngx-toastr';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-shopping-details',
  templateUrl: './shopping-details.component.html',
  styleUrls: ['./shopping-details.component.css']
})
export class ShoppingDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: GettingserviceService, private router: Router, private postService: PostServiceService, private deleteService: DeleteServiceService, private toastr: ToastrService) { }
  bannerSeason: any;
  seasonProducts: any;
  isLoading = false;
  cartedItems: any;
  incartActive = false;
  isWishlisted = false;
  searchTerm: string = '';
  wishlistData: any;

  ngOnInit() {
    window.scroll(0,0)
    this.bannerSeason = this.route.snapshot.paramMap.get('name');
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['product'] || null;
      if (this.searchTerm != null) {
        this.fetchProducts(this.searchTerm)
        this.wishlisted()
      };
      const autherizedUser = localStorage.getItem('user')
      if (autherizedUser) {
        this.service.getWishlist().subscribe((wishlistResponse) => {
          this.wishlistData = wishlistResponse.data;
          this.wishlisted()
        });
      }
    });




    // categories api //
    if (this.bannerSeason === 'Shirts') {
      this.isLoading = true; 
      this.service.getShirtCategory().subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading= false
        console.log(this.seasonProducts);
        this.wishlisted()
      });
    } else if (this.bannerSeason === 'Jeans Men') {
      this.isLoading = true; 
      this.service.getJeansMenCategory().subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading=false
        this.wishlisted()

      });
    } else if (this.bannerSeason === 'T shirts') {
      this.isLoading= true
      this.service.getTShirtMenCategory().subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading= false
        this.wishlisted()
      });
    } else if (this.bannerSeason === 'Trousers') {
      this.isLoading=true
      this.service.getTrousersCategory().subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading=false
        this.wishlisted()
      });
    } else if (this.bannerSeason === 'Shorts') {
      this.isLoading=true
      this.service.getShortsCategory().subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading=false
        this.wishlisted()
      });
    } else if (this.bannerSeason === 'kurtis') {
      this.isLoading=true
      this.service.getKurtiesWomenCategory().subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading=false
        this.wishlisted()
      });
    } else if (this.bannerSeason === 'T shirts woman') {
      this.isLoading=true
      this.service.getTShirtWimenCategory().subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading=false
        this.wishlisted()
      });
    } else if (this.bannerSeason === 'Jeans') {
      this.isLoading=true
      this.service.getJeansWomenCategory().subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading=false
        this.wishlisted()
      });
    } else if (this.bannerSeason === 'skirts') {
      this.isLoading=true
      this.service.getSkirtsWomenCategory().subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading=false
        this.wishlisted()
      });
    }
    else if (this.bannerSeason === 'Sports wear') {
      this.isLoading= true
      this.service.getSportswear().subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading=false
        this.wishlisted()
      });
    }
    else if (this.bannerSeason === 'Party wear Men') {
      this.isLoading=true
      this.service.getpartyWearMen().subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading=false
        this.wishlisted()
      });
    }
    else if (this.bannerSeason === 'Tops') {
      this.isLoading=true
      this.service.getTopwear().subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading=false
        this.wishlisted()
      });
    }
    else if (this.bannerSeason === 'jeggins') {
      this.isLoading=true
      this.service.getJegginswear().subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading=false
        this.wishlisted()
      });
    }
    else if (this.bannerSeason === 'sweater') {
      this.isLoading=true
      this.service.Sweaterwear().subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading=false
        this.wishlisted()
      });
    }


    // seasons //
    if (this.bannerSeason == 'season_winter') {
      this.isLoading=true
      this.service.getWinterSeasonProducts().subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading=false
        this.wishlisted()
      });
    }
    else if (this.bannerSeason == 'season_summer') {
      this.isLoading=true
      this.service.getSummerSeasonProducts().subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading=false
        this.wishlisted()

      });
    }
    else if (this.bannerSeason == 'season_mansoon') {
      this.isLoading=true
      this.service.getMansoonSeasonProducts().subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading=false
        this.wishlisted()

      });
    }
    else if (this.bannerSeason == 'season_autumn') {
      this.isLoading=true
      this.service.getAutumnSeasonProducts().subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading=false
        this.wishlisted()
      });
    }
  }

  wishlisted() {
    this.seasonProducts = this.seasonProducts?.map((product: any) => {
      const isWishlisted = this.wishlistData.some((wish: any) => wish.product === product.id);
      return { ...product, isWishlisted };
    });
  }

  fetchProducts(query: string) {
    this.isLoading = true;
    const autherizedUser = localStorage.getItem('user')
    if (autherizedUser) {
      forkJoin({
        wishlist: this.service.getWishlist(),
        searchResults: this.service.searchProducts(query)
      }).subscribe(({ wishlist, searchResults }) => {
        this.wishlistData = wishlist.data;
        this.seasonProducts = searchResults.data;
        this.wishlisted();
        this.isLoading = false;
      });
    }
    else {
      this.service.searchProducts(query).subscribe((data) => {
        this.seasonProducts = data.data
        this.isLoading = false;
      },error => {
        this.isLoading = false;  
        console.error('Error fetching products:', error);
      });
    }

  }

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
      this.postService.postWishlist(item.id).subscribe(data => {
        console.log(data);
        this.toastr.success(data.message)
      });

    } else
      this.router.navigate(['/auth/register'])
  }

}
