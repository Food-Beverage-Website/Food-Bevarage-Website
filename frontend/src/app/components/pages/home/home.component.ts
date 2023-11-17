import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';
import { TypeService } from 'src/app/services/type.service';
import { Store } from 'src/app/shared/models/store';
import { Type } from 'src/app/shared/models/type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  types :Type[]=[];
  products: any[]=[];
  stores:Store[]=[];

  constructor(private storeService:StoreService,private typeService:TypeService,private productService:ProductService, activatedRouter: ActivatedRoute)
  {
    let typeObservable:Observable<Type[]>
    let productObservable:Observable<any[]>
    let storeObservable:Observable<Store[]>
    activatedRouter.params.subscribe((params)=>{
      typeObservable=typeService.getAll();
      productObservable=productService.getAllProduct();
      storeObservable=storeService.getBestSelling();

      typeObservable.subscribe ((serverType)=>{
        this.types=serverType;
      })

      productObservable.subscribe ((serverProduct)=>{
        this.products=serverProduct.slice(0,10);
      })

      storeObservable.subscribe ((storeService)=>{
        this.stores=storeService.slice(0,5);
      })



    })


  }


  getMinPrice(donGiaArray: any[]): number {
    let minPrice = donGiaArray[0].Gia; // Giả sử giá đầu tiên là nhỏ nhất
  
    donGiaArray.forEach(donGia => {
      if (donGia.Gia < minPrice) {
        minPrice = donGia.Gia;
      }
    });
  
    return minPrice;
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
}
