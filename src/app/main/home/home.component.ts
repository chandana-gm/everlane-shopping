import { Component } from '@angular/core';
import { GettingserviceService } from 'src/app/service/gettingservice.service';


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
   ads:any[]=[]
   ngOnInit(){


    this.api.getCategory().subscribe((data:any)=>{
      console.log(data,"data");
    })
    this.api.getMensCategories().subscribe((data:any)=>{
      this.categories=data.data
      console.log(this.categories);   
    })
    this.api.getWomensCategories().subscribe((data:any)=>{
      this.womensCategories=data.data
      console.log(this.womensCategories);   
    })

   }

   selectGender(gender: string) {
     this.selectedGender = gender;
   }

}
