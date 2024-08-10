import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiasterRegisterComponent } from './diaster-register/diaster-register.component';
import { HomeDonationComponent } from './home-donation/home-donation.component';
import { DonationComponent } from './donation.component';

const routes: Routes = [
  { path: '', component: DonationComponent,children:[

    {path:'',component:DiasterRegisterComponent},
    {path:'donation%home',component:HomeDonationComponent},
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationRoutingModule { }
