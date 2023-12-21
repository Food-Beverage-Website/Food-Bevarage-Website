
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { DistanceService } from 'src/app/services/distance.service';
import { ProductService } from 'src/app/services/product.service';
import { DistanceBuyerService } from 'src/app/services/session/distance_buyer';
import { StoreService } from 'src/app/services/store.service';
import { TypeService } from 'src/app/services/type.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { Store } from 'src/app/shared/models/store';
import { Type } from 'src/app/shared/models/type';
import { Voucher } from 'src/app/shared/models/voucher';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  types :Type[]=[];
  products: any[]=[];
  stores:Store[]=[];
  voucher:Voucher[]=[];
  itemvoucher:any[]=[];

  constructor(private router:Router,
    private storeService:StoreService,
    private typeService:TypeService,
    private productService:ProductService,
    private voucherService:VoucherService, 
    private distanceService:DistanceService,
    private distanceBuyer:DistanceBuyerService,
    activatedRouter: ActivatedRoute)
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

      this.loadvoucher()

    })


  }

  nearme(){
    this.router.navigateByUrl('/nearme');
  }

  loadvoucher(){
  
    
      this.voucherService.getAllVoucher().subscribe((item)=>{
      
        this.voucher = item
      
      })
  }

  checkvoucherProduct(idSP: string): number {
    let hasVoucher = 0;
  
    this.voucher.forEach(element => {
      element.SanPhams.forEach(elementt => {
        if (idSP === elementt.idsp) {
          hasVoucher = 1;
  
          const currentDate = new Date();
          const startDate = new Date(element.NgayBatDau);
          const endDate = new Date(element.NgayKetThuc);
  
          
          if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime()) && startDate <= currentDate && currentDate <= endDate) {
            hasVoucher = 1;
          } else {
            hasVoucher = 0;
          }
        }
      });
    });
  
    return hasVoucher;
  }
  

  getTieuMuc(id:string){
    this.router.navigateByUrl('/category/'+id);
  }
  

  voucherProduct(idSP: string, price: string): number {
    let percent: number = 0;
  
    this.voucher.forEach(element => {
      element.SanPhams.forEach(elementt => {
        if (idSP === elementt.idsp) {
          percent = parseFloat(element.PhanTramGiam.replace('%', '')) / 100;
        }
      });
    });
  
  
    const discountedPrice = parseFloat(price) - parseFloat(price) * percent;
  
    return discountedPrice; 
  }
  
  

  goToShop(idShop:string)
  {
    this.router.navigateByUrl('/store/'+idShop);
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


  calMap(toado: string): string {
    const latB = this.distanceBuyer.currentLatitude;
    const lonB = this.distanceBuyer.currentLongitude;
    if(latB!==0 && lonB!==0 )
    {
      const [latA, lonA] = toado.split(',').map(parseFloat); 

 
      const distance = this.distanceService.calculateDistance(latA, lonA, latB, lonB);
      return distance.toFixed(2);
    }
    return ' '
  }
  

  newDishes(){
    this.router.navigateByUrl('/newDishes');
  }
  toTopProducts(){
    this.router.navigateByUrl('/top-25-products');
  }
  toTopStores(){
    this.router.navigateByUrl('/top-3-stores');
  }


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  

  
}
