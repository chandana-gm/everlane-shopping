import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { ProductcardComponent } from './productcard/productcard.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppHeaderComponent,
    AppFooterComponent,
    ProductcardComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[AppFooterComponent,AppHeaderComponent]
})
export class SharedSchemaModule { 
  constructor(){
    console.log("SharedSchemaModule loaded");
    
  }
}
