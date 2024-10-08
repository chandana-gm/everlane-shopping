import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GettingserviceService } from 'src/app/service/gettingservice.service';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.css']
})
export class DonationListComponent implements OnInit {
  constructor(private getService: GettingserviceService, private fb: FormBuilder) { }
  data: any[] = [];
  disasterList: any[] = [];
  donationlist:any[]=[];
  list!: FormGroup
  dis:any
  isProcesing=false


  ngOnInit(): void {
 
    this.list = this.fb.group({
      disaster: ['', Validators.required]
    })

    this.getService.getDisasterList().subscribe((response) => {
      
      console.log(response, 'res');
      this.data = response.data
      this.disasterList=response.data
      console.log(this.data);
      

    });
  
  }
  
  onSubmit()
  {
    const disasterId = this.list.get('disaster')?.value;
    console.log(disasterId);
    if (disasterId) {
      this.isProcesing = true;
      
        this.getService.getDonationList(disasterId).subscribe((response) => {
          console.log(response,'abc');
                  this.donationlist=response.data
                  this.isProcesing = false; 
                }, error => {
                  console.error('Error fetching donation list', error);
                  this.isProcesing = false; 
                });
              }
               
                  
                 
                  
          
    
  }
  onDisasterChange(event: Event) {
    this.isProcesing=true
    const selectedDisasterId = (event.target as HTMLSelectElement).value;
    console.log(selectedDisasterId);
    this.dis = this.disasterList.find(disaster => disaster.id === +selectedDisasterId);
    this.isProcesing=false
    this.onSubmit()
   
  }
}


