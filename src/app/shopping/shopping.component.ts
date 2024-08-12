import { Component } from '@angular/core';
import { GettingserviceService } from '../service/gettingservice.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent {
  constructor(private service:GettingserviceService){}
  isLoading=false
  ngOnInit() {
    this.service.getShirtCategory().subscribe((data: any) => {
      this.isLoading=true
    });
  }
}
