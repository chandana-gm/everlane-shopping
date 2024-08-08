import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingModule } from '../shopping/shopping.module';
import { WishlistComponent } from './wishlist/wishlist.component';
import { WalldrobeComponent } from './walldrobe/walldrobe.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ProfileComponent,
    WishlistComponent,
    WalldrobeComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,  
  ]
})
export class MainModule { }
