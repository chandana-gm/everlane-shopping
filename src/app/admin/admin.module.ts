import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

import { ProductUpdateComponent } from './product-update/product-update.component';
import { ReturnRequestComponent } from './return-request/return-request.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { DisasterTrackingApprovelComponent } from './disaster-tracking-approvel/disaster-tracking-approvel.component';
import { DonationListComponent } from './donation-list/donation-list.component';
import { MaincontentComponent } from './maincontent/maincontent.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { FormsModule } from '@angular/forms';
import { StatusComponent } from './status/status.component'; 



@NgModule({
  declarations: [
    AdminComponent,
    AdminHomeComponent,

    ProductUpdateComponent,
    ReturnRequestComponent,
    ViewOrdersComponent,
    OrderStatusComponent,
    DisasterTrackingApprovelComponent,
    DonationListComponent,
    MaincontentComponent,
    AdminheaderComponent,
    StatusComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule 
  ]
})
export class AdminModule { }
