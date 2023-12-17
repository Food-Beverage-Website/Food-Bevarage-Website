
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './components/pages/home/home.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { ProductlistComponent } from './components/pages/productlist/productlist.component';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { UserComponent } from './components/pages/user/user.component';
import { UserInforComponent } from './components/partials/user-infor/user-infor.component';
import { UserOrderComponent } from './components/partials/user-order/user-order.component';
import { UserProfileComponent } from './components/partials/user-profile/user-profile.component';
import { StoreComponent } from './components/pages/store/store.component';
import { StoreModule } from './components/pages/store/store.module';
import { StoreManagementComponent } from './components/pages/store-management/store-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ProductStoreComponent } from './components/partials/product-store/product-store.component';
import { NotificationsStoreComponent } from './components/partials/notifications-store/notifications-store.component';
import { StoreInforComponent } from './components/partials/store-infor/store-infor.component';
import { StoreOrderComponent } from './components/partials/store-order/store-order.component';
import { StoreProductComponent } from './components/partials/store-product/store-product.component';
import { DatePipe } from '@angular/common';
import { StoreModifyProductComponent } from './components/partials/store-modify-product/store-modify-product.component';
import { StoreToppingComponent } from './components/partials/store-topping/store-topping.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { StoreVoucherComponent } from './components/partials/store-voucher/store-voucher.component';
import { StoreVoucherModifyComponent } from './components/partials/store-voucher-modify/store-voucher-modify.component';
import { StoreProductAdditionalComponent } from './components/partials/store-product-additional/store-product-additional.component';
import { StoreCategoryComponent } from './components/partials/store-category/store-category.component';
import { StoreCategoryModifyComponent } from './components/partials/store-category-modify/store-category-modify.component';
import { DetailProductComponent } from './components/pages/detail-product/detail-product.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptorTsInterceptor } from './shared/interceptor/loading.interceptor.ts.interceptor';
import { StoreModifyMapComponent } from './components/partials/store-modify-map/store-modify-map.component';
import { StoreOrderDetailComponent } from './components/partials/store-order-detail/store-order-detail.component';
import { CarouselModule } from 'primeng/carousel';
import { DathangDialogComponent } from './components/pages/dathang-dialog/dathang-dialog.component';
import { StoreThongkeComponent } from './components/partials/store-thongke/store-thongke.component';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ProductlistComponent,
    LoginPageComponent,
    UserComponent,
    UserInforComponent,
    UserOrderComponent,
    UserProfileComponent,
    StoreManagementComponent,
    ProductStoreComponent,
    NotificationsStoreComponent,
    StoreInforComponent,
    StoreOrderComponent,
    StoreProductComponent,
    StoreModifyProductComponent,
    StoreToppingComponent,
    RegisterComponent,
    StoreVoucherComponent,
    StoreVoucherModifyComponent,
    StoreProductAdditionalComponent,
    StoreCategoryComponent,
    StoreCategoryModifyComponent,
    DetailProductComponent,
    CartPageComponent,
    LoadingComponent,
    StoreModifyMapComponent,
    StoreOrderDetailComponent,
    DathangDialogComponent,
    StoreThongkeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule,
    DatePipe,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    }),
    CarouselModule,
    NgChartsModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptorTsInterceptor,multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
