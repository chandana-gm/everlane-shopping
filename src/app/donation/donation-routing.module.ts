import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiasterRegisterComponent } from './diaster-register/diaster-register.component';
import { HomeDonationComponent } from './home-donation/home-donation.component';
import { DonationComponent } from './donation.component';
import { ClientDonationComponent } from './client-donation/client-donation.component';
import { SuccessDonationComponent } from './success-donation/success-donation.component';


const routes: Routes = [
  { path: '', component: DonationComponent,children:[

    {path:'',component:DiasterRegisterComponent},
    {path:'donation%home',component:HomeDonationComponent},
    {path:'client_donat',component:ClientDonationComponent},
    {path:'donation-success',component:SuccessDonationComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class DonationRoutingModule { }
