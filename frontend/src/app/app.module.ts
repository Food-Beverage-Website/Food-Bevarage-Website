import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './components/pages/home/home.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { ProductlistComponent } from './components/pages/productlist/productlist.component';
import { NgbPaginationModule, NgbAlertModule   } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { UserComponent } from './components/pages/user/user.component';
import { UserInforComponent } from './components/partials/user-infor/user-infor.component';
import { UserOrderComponent } from './components/partials/user-order/user-order.component';
import { UserProfileComponent } from './components/partials/user-profile/user-profile.component';
import { DetailProductComponent } from './components/pages/detail-product/detail-product.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';


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
    DetailProductComponent,
    CartPageComponent,
    
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
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
