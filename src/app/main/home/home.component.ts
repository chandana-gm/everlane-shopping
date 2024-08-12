import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GettingserviceService } from 'src/app/service/gettingservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 

  constructor(private api: GettingserviceService,private router:Router) { }

  @ViewChild('marquee') marquee!: ElementRef;
  selectedGender: string = 'Men';
  categories: any[] = [];
  womensCategories: any[] = [];
  banners: any;
  trending: any;
  isLoading=false

  selectGender(gender: string) {
    this.selectedGender = gender;
  }

  ngOnInit() {
    this.api.getMensCategories().subscribe((data: any) => {
      this.categories = data.data;
      this.isLoading=true
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
    this.marquee.nativeElement.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.marquee.nativeElement.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
  }
}
