import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductlistComponent } from './components/pages/productlist/productlist.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { UserComponent } from './components/pages/user/user.component';
import { UserInforComponent } from './components/partials/user-infor/user-infor.component';
import { UserOrderComponent } from './components/partials/user-order/user-order.component';
import { StoreComponent } from './components/pages/store/store.component';
import { StoreManagementComponent } from './components/pages/store-management/store-management.component';
import { StoreInforComponent } from './components/partials/store-infor/store-infor.component';
import { StoreOrderComponent } from './components/partials/store-order/store-order.component';
import { StoreProductComponent } from './components/partials/store-product/store-product.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { StoreVoucherComponent } from './components/partials/store-voucher/store-voucher.component';
import { StoreProductAdditionalComponent } from './components/partials/store-product-additional/store-product-additional.component';
import { StoreCategoryComponent } from './components/partials/store-category/store-category.component';
import { StoreCategoryModifyComponent } from './components/partials/store-category-modify/store-category-modify.component';
import { DetailProductComponent } from './components/pages/detail-product/detail-product.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { StoreOrderDetailComponent } from './components/partials/store-order-detail/store-order-detail.component';
import { DathangDialogComponent } from './components/pages/dathang-dialog/dathang-dialog.component';
import { StoreThongkeComponent } from './components/partials/store-thongke/store-thongke.component';



const routes: Routes = [
{path:'',component:HomeComponent},
{path:'search/:Searchname',component:ProductlistComponent},
{path:'login',component:LoginPageComponent},
{path:'user',component:UserComponent},
{path:'store/:idStore',component:StoreComponent},
{path:'login/register',component:RegisterComponent},

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
 
 { 
   path: 'storee/category/modify/:name',
   component: StoreManagementComponent,
   children:[{
      path:'',
      component:StoreCategoryModifyComponent
   }]
  }
 ,


 { 
   path: 'storee/order/:name',
   component: StoreManagementComponent,
   children:[{
      path:'',
      component:StoreOrderDetailComponent
   }]
  }
 ,

 { 
   path: 'storee/category',
   component: StoreManagementComponent,
   children:[{
      path:'',
      component:StoreCategoryComponent
   }]
  },


 { 
   path: 'storee/infor',
   component: StoreManagementComponent,
   children:[{
      path:'',
      component:StoreInforComponent
   }]
  },
  { 
   path: 'storee/product/additional',
   component: StoreManagementComponent,
   children:[{
      path:'',
      component:StoreProductAdditionalComponent
   }]
  },

  { 
   path: 'storee/product',
   component: StoreManagementComponent,
   children:[{
      path:'',
      component:StoreProductComponent
   }]
  },
  { 
   path: 'storee/voucher',
   component: StoreManagementComponent,
   children:[{
      path:'',
      component:StoreVoucherComponent
   }]
  }
  ,

  { 
   path: 'storee/order',
   component: StoreManagementComponent,
   children:[{
      path:'',
      component:StoreOrderComponent
   }]
  },
//================================================
//Duy Minh

{ 
   path: 'storee/thongke',
   component: StoreManagementComponent,
   children:[{
      path:'',
      component:StoreThongkeComponent
   }]
  },

  {path: 'detailproduct/:productId', component:DetailProductComponent},
 {path: 'cart_page', component:CartPageComponent},
 {path: 'cart_page/checkout', component:DathangDialogComponent},
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
