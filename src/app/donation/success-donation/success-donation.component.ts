import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-donation',
  templateUrl: './success-donation.component.html',
  styleUrls: ['./success-donation.component.css']
})
export class SuccessDonationComponent {
  constructor(private router:Router){}
ngOnInit(){
  window.scroll(0,0)
}
back(){
this.router.navigate(['donation/donation%home'])
}
}
