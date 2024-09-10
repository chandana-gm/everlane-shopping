import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './service/interceptor.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaginatorModule } from 'primeng/paginator';

// import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,


    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule ,
    // NgxIntlTelInputModule,
    ToastrModule.forRoot({ 
      maxOpened: 1,
      autoDismiss: true,
      positionClass: 'toast-bottom-center', 
    }),
    PaginatorModule,

  
  
    
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
  exports: [PageNotFoundComponent]
})
export class AppModule { }
