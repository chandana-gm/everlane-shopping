import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';
import { ShoppingDetailsComponent } from './shopping-details/shopping-details.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    ShoppingComponent,
    ShoppingDetailsComponent,
    DetailPageComponent,
    CartComponent,
    
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule
  ]
})
export class ShoppingModule { }
