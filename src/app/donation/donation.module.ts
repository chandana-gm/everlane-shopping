import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedSchemaModule } from '../shared-schema/shared-schema.module';
import { DonationRoutingModule } from './donation-routing.module';
import { DonationComponent } from './donation.component';
import { DiasterRegisterComponent } from './diaster-register/diaster-register.component';
import { HomeDonationComponent } from './home-donation/home-donation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientDonationComponent } from './client-donation/client-donation.component';
import { SuccessDonationComponent } from './success-donation/success-donation.component';



@NgModule({
  declarations: [
    DonationComponent,
    DiasterRegisterComponent,
    HomeDonationComponent,
    ClientDonationComponent,
    SuccessDonationComponent
  ],
  imports: [
    CommonModule,
    DonationRoutingModule,
    SharedSchemaModule,
    ReactiveFormsModule,

  ]
})
export class DonationModule { }
