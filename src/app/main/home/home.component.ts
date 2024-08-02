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
     this.ads = [
      { title: 'Ad 1', description: 'Description for Ad 1', img: 'https://via.placeholder.com/300x200' },
      { title: 'Ad 2', description: 'Description for Ad 2', img: 'https://via.placeholder.com/300x200' },
      { title: 'Ad 3', description: 'Description for Ad 3', img: 'https://via.placeholder.com/300x200' },
      { title: 'Ad 4', description: 'Description for Ad 4', img: 'https://via.placeholder.com/300x200' }
    ];

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
