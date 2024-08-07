import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GettingserviceService } from 'src/app/service/gettingservice.service';



@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {
  singleProduct: any;
  productId: any;
  fullData: any[]=[]

  constructor(private route: ActivatedRoute, private service: GettingserviceService) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');

    this.service.getTrendingProducts().subscribe(response => {
      this.fullData = response.data;
      console.log(this.fullData,"fulldata");
      this.singleProduct = this.fullData.find(product => product.id === this.productId);
      if (this.singleProduct) {
        console.log("Single product", this.singleProduct);
      } else {
        console.log("Product not found");
      }
    });
  }
}
