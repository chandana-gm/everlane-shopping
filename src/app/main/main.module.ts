import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
