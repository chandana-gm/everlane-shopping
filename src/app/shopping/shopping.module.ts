import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';
import { ShoppingDetailsComponent } from './shopping-details/shopping-details.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedSchemaModule } from '../shared-schema/shared-schema.module';




@NgModule({
  declarations: [
    ShoppingComponent,
    ShoppingDetailsComponent,
    DetailPageComponent,
    CartComponent,
    CheckoutComponent,
    
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    ReactiveFormsModule,
    SharedSchemaModule

  ]
})
export class ShoppingModule { }
