import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminAuthGuard } from './guards/guards.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



const routes: Routes = [
  { path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule) }, 
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'shopping', loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule) },
  {path:'',redirectTo:'main', pathMatch:'full'},
  { path: 'donation', loadChildren: () => import('./donation/donation.module').then(m => m.DonationModule) },
  { path: 'admin',  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '**', component: PageNotFoundComponent }
  // { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
