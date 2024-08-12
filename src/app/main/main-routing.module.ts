import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';


const routes: Routes = [
  // { path: 'main', component: MainComponent },
  {path:'',component:HomeComponent},
  {path:'profile',component:ProfileComponent},
  {path:'wishlist',component:WishlistComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
