import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductlistComponent } from './components/pages/productlist/productlist.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';

const routes: Routes = [
{path:'',component:HomeComponent},
{path:'search/:Searchname',component:ProductlistComponent},
{path:'login',component:LoginPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
