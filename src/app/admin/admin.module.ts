import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ReturnRequestComponent } from './return-request/return-request.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { DisasterTrackingApprovelComponent } from './disaster-tracking-approvel/disaster-tracking-approvel.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminHomeComponent,
    AddProductComponent,
    ProductUpdateComponent,
    ReturnRequestComponent,
    ViewOrdersComponent,
    OrderStatusComponent,
    DisasterTrackingApprovelComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
