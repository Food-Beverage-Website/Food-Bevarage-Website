import { Component } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-stores',
  templateUrl: './list-stores.component.html',
  styleUrl: './list-stores.component.css'
})
export class ListStoresComponent {
  stores: any[]=[];
  productsData: any[]=[];
  constructor(private router:Router, private storeservice: StoreService, private productservice: ProductService){
    this.productservice.getAllProduct().subscribe((data)=>{
      this.productsData = data;
    });
    this.storeservice.getAllStore().subscribe((data)=>{
      this.stores = data;
    })
  }
  goToShop(idShop:string)
  {
    this.router.navigateByUrl('/store/'+idShop);
  }
  
  getNumberProducts(MaCuaHang: string): string {

    return this.productsData.reduce((count, item) => {
      return item.MaCH._id === MaCuaHang ? count + 1 : count;
    }, 0);
  }



}