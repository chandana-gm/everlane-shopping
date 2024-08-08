import { Component } from '@angular/core';
import { GettingserviceService } from 'src/app/service/gettingservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
constructor(private service:GettingserviceService){}

ngOnInit(){
  // this.service.getCart().subscribe(response=>{
  //   console.log(response);
    
  // })
}

}
