import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
    this.api.getAutumnSeasonProducts().subscribe((data) => {
      console.log("autumn", data);
    });
  }


  onImageClick(season: string) {
    console.log(season);
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
