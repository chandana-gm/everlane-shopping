import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteServiceService } from 'src/app/service/delete-service.service';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-shopping-details',
  templateUrl: './shopping-details.component.html',
  styleUrls: ['./shopping-details.component.css']
})
export class ShoppingDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: GettingserviceService, private router: Router, private postService: PostServiceService, private deleteService:DeleteServiceService) { }
  bannerSeason: any;
  seasonProducts: any;
  isLoading = false

  ngOnInit() {
    this.bannerSeason = this.route.snapshot.paramMap.get('name');


    // categories api //
    if (this.bannerSeason == 'Shirts') {
      this.service.getShirtCategory().subscribe((data) => {
        this.seasonProducts = data.data.map((item: any) => ({ ...item, isWishlisted: false }));
        console.log(data);

        this.isLoading = true
      });
    }
    if (this.bannerSeason == 'Jeans Men') {
      this.service.getJeansMenCategory().subscribe((data) => {
        this.seasonProducts = data.data.map((item: any) => ({ ...item, isWishlisted: false }));
        this.isLoading = true
      });
    }
    if (this.bannerSeason == 'T shirts') {
      this.service.getTShirtMenCategory().subscribe((data) => {
        this.seasonProducts = data.data.map((item: any) => ({ ...item, isWishlisted: false }));
        this.isLoading = true
      });
    }
    if (this.bannerSeason == 'Trousers') {
      this.service.getTrousersCategory().subscribe((data) => {
        this.seasonProducts = data.data.map((item: any) => ({ ...item, isWishlisted: false }));
        this.isLoading = true
      });
    }
    if (this.bannerSeason == 'Shorts') {
      this.service.getShortsCategory().subscribe((data) => {
        this.seasonProducts = data.data.map((item: any) => ({ ...item, isWishlisted: false }));
        this.isLoading = true
      });
    }
    if (this.bannerSeason == 'kurtis') {
      this.service.getKurtiesWomenCategory().subscribe((data) => {
        this.seasonProducts = data.data.map((item: any) => ({ ...item, isWishlisted: false }));
        this.isLoading = true
      });
    }
    if (this.bannerSeason == 'T shirts woman') {
      this.service.getTShirtWimenCategory().subscribe((data) => {
        this.seasonProducts = data.data.map((item: any) => ({ ...item, isWishlisted: false }));
        this.isLoading = true
      });
    }
    if (this.bannerSeason == 'Jeans') {
      this.service.getJeansWomenCategory().subscribe((data) => {
        this.seasonProducts = data.data.map((item: any) => ({ ...item, isWishlisted: false }));
        this.isLoading = true
      });
    }
    if (this.bannerSeason == 'skirts') {
      this.service.getSkirtsWomenCategory().subscribe((data) => {
        this.seasonProducts = data.data.map((item: any) => ({ ...item, isWishlisted: false }));
        this.isLoading = true
      });
    }

    // seasons //
    if (this.bannerSeason == 'season_winter') {
      this.service.getWinterSeasonProducts().subscribe((data) => {
        this.seasonProducts = data.data.map((item: any) => ({ ...item, isWishlisted: false }));
        this.isLoading = true
      });
    }
    if (this.bannerSeason == 'season_summer') {
      this.service.getSummerSeasonProducts().subscribe((data) => {
        this.seasonProducts = data.data.map((item: any) => ({ ...item, isWishlisted: false }));
        this.isLoading = true
      });
    }
    if (this.bannerSeason == 'season_mansoon') {
      this.service.getMansoonSeasonProducts().subscribe((data) => {
        this.seasonProducts = data.data.map((item: any) => ({ ...item, isWishlisted: false }));
        this.isLoading = true
      });
    }
    if (this.bannerSeason == 'season_autumn') {
      this.service.getAutumnSeasonProducts().subscribe((data) => {
        this.seasonProducts = data.data.map((item: any) => ({ ...item, isWishlisted: false }));
        this.isLoading = true
      });
    }
  }


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

  cartedItem(item: any) {
    console.log('carted', item);
    this.postService.postCart(item)


  }
  async wishlistEvent(item: any) {
    const previousState = item.isWishlisted;
    const storedUser = localStorage.getItem('user');
  
    if (!storedUser) {
      console.error('User not authenticated');
      return;
    }
  
    const user = JSON.parse(storedUser);
    try {
      const decryptedToken = await this.postService.decryptData(user.token, 'token');
      // console.log('Decrypted Token:', decryptedToken);
      // console.log('Item ID:', item.id);
  
      if (previousState) {
        await this.deleteWishlistItem(item, decryptedToken);
      } else {
        const wishlistResponseId = await this.addWishlistItem(item, decryptedToken);
        item.wishlistResponseId = wishlistResponseId;
        console.log("item.wishlistResponseId",item.wishlistResponseId);
        
      }
      item.isWishlisted = !previousState;
  
    } catch (error) {
      console.error('Error decrypting token', error);
      item.isWishlisted = previousState;
    }
  }
  
  async deleteWishlistItem(item: any, decryptedToken: string) {
    console.log(item);
    
    try {
      const response = await this.deleteService.removeItemFromWishlist(item.wishlistResponseId, decryptedToken).toPromise();
      console.log('Removed from wishlist:', response);
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  }
  
  async addWishlistItem(item: any, decryptedToken: string){
    try {
      const response = await this.postService.postWishlist(item.id, decryptedToken).toPromise();
      console.log('Added to wishlist');
      return response.data.id; 
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
      throw error;
    }
  }
  


  //   const storedUser = localStorage.getItem('user'); 
  //   if (storedUser) {
  //     const user = JSON.parse(storedUser);
  //     const decryptedToken = await this.postService.decryptData(user.token, 'token');

  // }

  productDetails(id: any) {
    this.router.navigate(['/shopping/detailsPage', id]);
  }
}
