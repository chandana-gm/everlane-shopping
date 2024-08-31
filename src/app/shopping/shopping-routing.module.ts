import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingComponent } from './shopping.component';
import { ShoppingDetailsComponent } from './shopping-details/shopping-details.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessPaymentComponent } from './payment-status/success-payment/success-payment.component';
import { FailedPaymentComponent } from './payment-status/failed-payment/failed-payment.component';
import { preventBackGuard } from '../guards/prevent-back.guard';
import { cartGuard } from '../guards/cart-guard.guard';



const routes: Routes = [
  {path:'',component:ShoppingComponent, children:[
    {path:'shoppingDetails/:name',component:ShoppingDetailsComponent},
    {path:'detailsPage/:id',component:DetailPageComponent, runGuardsAndResolvers: 'paramsOrQueryParamsChange'},
    {path:'cart',component:CartComponent},
    {path:'checkout',component:CheckoutComponent,canActivate:[cartGuard]},
    {path:'payment',component:PaymentComponent},
    {path:'payment-success',component:SuccessPaymentComponent
      // ,canDeactivate:[preventBackGuard]
    },
    {path:'payment-failed',component:FailedPaymentComponent}
  ]}
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
