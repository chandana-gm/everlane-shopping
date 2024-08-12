import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedSchemaModule } from '../shared-schema/shared-schema.module';
import { DonationRoutingModule } from './donation-routing.module';
import { DonationComponent } from './donation.component';
import { DiasterRegisterComponent } from './diaster-register/diaster-register.component';
import { HomeDonationComponent } from './home-donation/home-donation.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DonationComponent,
    DiasterRegisterComponent,
    HomeDonationComponent
  ],
  imports: [
    CommonModule,
    DonationRoutingModule,
    SharedSchemaModule,
    ReactiveFormsModule
  ]
})
export class DonationModule { }
