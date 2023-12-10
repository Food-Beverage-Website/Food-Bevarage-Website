import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductlistComponent } from './components/pages/productlist/productlist.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { UserComponent } from './components/pages/user/user.component';
import { UserInforComponent } from './components/partials/user-infor/user-infor.component';
import { UserOrderComponent } from './components/partials/user-order/user-order.component';
import { DetailProductComponent } from './components/pages/detail-product/detail-product.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';


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
 {path: 'detailproduct/:productId', component:DetailProductComponent},
 {path: 'cart_page', component:CartPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
