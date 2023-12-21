import { Component } from '@angular/core';
import { Store } from 'src/app/shared/models/store';
import { StoreService } from 'src/app/services/store.service';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-top-stores',

  templateUrl: './top-stores.component.html',
  styleUrl: './top-stores.component.css'
})
export class TopStoresComponent {
  stores: Store[]=[];
  productsData: any[]=[];
  constructor(private productservice: ProductService,private router :Router, private storeService:StoreService,private activatedRouter: ActivatedRoute ){
    this.productservice.getAllProduct().subscribe((data)=>{
      this.productsData = data;
    });
    let storeObservable:Observable<Store[]>

    activatedRouter.params.subscribe((params)=>{
      storeObservable = storeService.getBestSelling();
      storeObservable.subscribe ((storeService)=>{
        this.stores=storeService.slice(0,3);
      })
    })
  }
  goToShop(idShop:string)
  {
    this.router.navigateByUrl('/store/'+idShop);
  }
  getNumberProducts(MaCuaHang: string): string {
    return this.productsData.reduce((count, item) => {
      return item.MaCH === MaCuaHang ? count + 1 : count;
    }, 0);
  }
}