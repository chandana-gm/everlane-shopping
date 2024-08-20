import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 

  constructor(private api: GettingserviceService,private router:Router, private service:PostServiceService) { }

  @ViewChild('marquee') marquee!: ElementRef;
  selectedGender: string = 'Men';
  categories: any[] = [];
  womensCategories: any[] = [];
  banners: any;
  trending: any;

  selectGender(gender: string) {
    this.selectedGender = gender;
  }

  ngOnInit() {

    

    this.api.getMensCategories().subscribe((data: any) => {
      this.categories = data.data;
    });
    this.api.getWomensCategories().subscribe((data: any) => {
      this.womensCategories = data.data;
    });
    this.api.getBanners().subscribe((data) => {
      this.banners = data;
    });
    this.api.getTrendingProducts().subscribe((data) => {
      this.trending = data.data;
    });
  }

  onCategoryClick(category:any){
    this.router.navigate(['shopping/shoppingDetails', category.name]);   
  }

  onImageClick(season: string) {
    this.router.navigate(['shopping/shoppingDetails',season]);
  }

scrollLeft() {
  this.pauseMarquee();
  this.marquee.nativeElement.scrollBy({
    left: -200,
    behavior: 'smooth'
  });
  this.resumeMarquee();
}

scrollRight() {
  this.pauseMarquee();
  this.marquee.nativeElement.scrollBy({
    left: 200,
    behavior: 'smooth'
  });
  this.resumeMarquee();
}

pauseMarquee() {
  this.marquee.nativeElement.style.animationPlayState = 'paused';
}

resumeMarquee() {
  setTimeout(() => {
    this.marquee.nativeElement.style.animationPlayState = 'running';
  }, 500); 
}
clicked(item:any){
  console.log(item);
  this.router.navigate(['/shopping/detailsPage',item.id])
  
}
}
