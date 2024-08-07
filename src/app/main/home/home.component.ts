import { Component } from '@angular/core';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

   constructor(private api:GettingserviceService){}
   selectedGender: string = 'Men';
   categories: any[] = []
   womensCategories: any[] = []
   banners: any
   trending:any
   ads:any[]=[]
   ngOnInit(){

    this.api.getMensCategories().subscribe((data:any)=>{
      this.categories=data.data
      console.log(this.categories);   
    })
    this.api.getWomensCategories().subscribe((data:any)=>{
      this.womensCategories=data.data
      console.log(this.womensCategories);   
    })
    this.api.getBanners().subscribe((data)=>{
      console.log(data);
      this.banners=data
    })
    this.api.getTrendingProducts().subscribe((data)=>{
      this.trending= data.data
      console.log(this.trending);
      
    })

   }

   selectGender(gender: string) {
     this.selectedGender = gender;
   }

}
