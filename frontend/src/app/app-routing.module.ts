import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductlistComponent } from './components/pages/productlist/productlist.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { UserComponent } from './components/pages/user/user.component';
import { UserInforComponent } from './components/partials/user-infor/user-infor.component';
import { UserOrderComponent } from './components/partials/user-order/user-order.component';
import { ChitietProductComponent } from './components/pages/chitiet-product/chitiet-product.component';

const routes: Routes = [
{path:'',component:HomeComponent},
{path:'search/:Searchname',component:ProductlistComponent},
{path:'login',component:LoginPageComponent},
{path:'user',component:UserComponent},
{ 
 path: 'user/infor',
 component: UserComponent,
 children:[{
    path:'',
    component:UserInforComponent
 }]
},

{ 
  path: 'user/ordered',
  component: UserComponent,
  children:[{
     path:'',
     component:UserOrderComponent
  }]
 },
 {path: 'chitietsanpham/:productId', component:ChitietProductComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
