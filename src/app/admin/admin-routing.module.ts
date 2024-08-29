import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ReturnRequestComponent } from './return-request/return-request.component';
import { DiasterRegisterComponent } from '../donation/diaster-register/diaster-register.component';
import { DisasterTrackingApprovelComponent } from './disaster-tracking-approvel/disaster-tracking-approvel.component';
import { DonationListComponent } from './donation-list/donation-list.component';

const routes: Routes = [{ path: '', component: AdminComponent, children:[
  {path:'addProduct',component:AddProductComponent},
  {path:'view%orders',component:ViewOrdersComponent},
  {path:'order%status',component:OrderStatusComponent},
  {path:'update%product',component:ProductUpdateComponent},
  {path:'order%status',component:OrderStatusComponent},
  {path:'returnrequest',component:ReturnRequestComponent},
  {path:'disaterstatusrequest',component:DisasterTrackingApprovelComponent},
  {path:'donation_list',component:DonationListComponent},


] },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
