import { Component, OnInit } from '@angular/core';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  isAuthenticated = false
  disasterList: any[] = []
  returnlist: any[] = []
  disapprovList: any[] = []
  productlist: [] = []
  productlength: any
  disapprovListLength: any
  returnlistlegth: any
  disasterListtLength: any
  loading: boolean = false;
  ordercount:any
  statuscount:any
  constructor(private service: PostServiceService, private getService: GettingserviceService) { }
  ngOnInit(): void {
    this.loading=true
    this.getService.getAllProductList().subscribe((data) => {
      this.loading=false
      this.productlist = data.data
      console.log(this.productlist);
      this.productlength = this.productlist.length

    })
    this.getService.getAllreturnProduct().subscribe((data) => {
      this.loading=false
      this.returnlist = data.data
      console.log(this.returnlist);
      this.returnlistlegth = this.returnlist.length
    })
    this.getService.getDiasterRegister().subscribe((data) => {
      this.loading=false
      this.disapprovList = data.data
      console.log(this.disapprovList);
      this.disapprovListLength = this.disapprovList.length
    })
    this.getService.getDisasterList().subscribe((data) => {
      this.loading=false
      this.disasterList = data.data
      console.log(this.disasterList);
      this.disasterListtLength = this.disasterList.length
    })

    this.loadProducts()
    this.load()


  }
  loadProducts(page: number = 1): void {
    this.loading=true
    this.getService.getAllOreders(page).subscribe((data:any)=>{
      this.loading=false
       console.log('paginated', data);
       this.ordercount=data.count;
       console.log(this.ordercount);
       

    });
  }

  
load(page: number = 1): void {
  this.loading=true
  this.getService.getOrderPagination(page).subscribe((data:any)=>{
    this.loading=false
  console.log(data);
  this.statuscount=data.count
  });
  

}


}