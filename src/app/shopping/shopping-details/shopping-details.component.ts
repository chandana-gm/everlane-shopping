import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-shopping-details',
  templateUrl: './shopping-details.component.html',
  styleUrls: ['./shopping-details.component.css']
})
export class ShoppingDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: GettingserviceService, private router: Router, private postService:PostServiceService,private toastr:ToastrService) { }
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

   async cartedItem(item: any) {
   const stored=localStorage.getItem('user');
   if(stored)
   {
    const data=JSON.parse(stored);
    const decryptedToken = await this.postService.decryptData(data.token, 'token');
    console.log('decrpt',decryptedToken);
    console.log('carted', item.id);
    this.postService.postCart(item.id,decryptedToken).subscribe((data:any)=>{
   
        console.log('response', data);
        this.toastr.success(data.message);
          
      },
      (error: any) => {
        console.error('Error:', error);
        this.toastr.error(data.message);
          
      }
    );
    
  
}
   

  }
  async wishlistEvent(item: any) {
    const storedUser = localStorage.getItem('user'); 
    if (storedUser) {
      const user = JSON.parse(storedUser);
  
      const decryptedToken = await this.postService.decryptData(user.token, 'token');
      console.log('Decrypted Token:', decryptedToken);
      console.log('Item ID:', item.id);
  
      this.postService.postWishlist(item.id, decryptedToken).subscribe(
        (response) => {
          console.log('Posting response:', response);
        },
        (error) => {
          console.error('Error posting to wishlist:', error);
        }
      );
      item.isWishlisted = !item.isWishlisted;
    } else {
      console.error('User not authenticated');
    }
  }
  

  productDetails(id: any) {
    this.router.navigate(['/shopping/detailsPage', id]);
  }
}
