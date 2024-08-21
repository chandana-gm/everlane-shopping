import { Component, OnInit } from '@angular/core';
import { GettingserviceService } from 'src/app/service/gettingservice.service';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.css']
})
export class DonationListComponent implements OnInit{
  constructor(private getService:GettingserviceService){}
  ngOnInit(): void {
    this.getService.getDisasterList().subscribe((response) => {
      console.log(response,'res');
      const id=response.diaster
      this.getService.getDonationList(id).subscribe((response) => {
        console.log(response);
    });
    }); 
  }
    
  }


