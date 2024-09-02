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
  constructor(private service: PostServiceService, private getService: GettingserviceService) { }
  ngOnInit(): void {
    this.getService.getAllProductList().subscribe((data) => {

      this.productlist = data.data
      console.log(this.productlist);
      this.productlength = this.productlist.length

    })
    this.getService.getAllreturnProduct().subscribe((data) => {
      this.returnlist = data.data
      console.log(this.returnlist);
      this.returnlistlegth = this.returnlist.length
    })
    this.getService.getDiasterRegister().subscribe((data) => {
      this.disapprovList = data.data
      console.log(this.disapprovList);
      this.disapprovListLength = this.disapprovList.length
    })
    this.getService.getDisasterList().subscribe((data) => {
      this.disasterList = data.data
      console.log(this.disasterList);
      this.disasterListtLength = this.disasterList.length
    })




  }
  // logout() {
  //   this.service.postLogout().subscribe((data)=>{
  //     console.log(data);
  //     this.isAuthenticated = false;

  //     localStorage.removeItem('user');

  //   })

}


