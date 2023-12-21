import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Store } from 'src/app/shared/models/store';
import { StoreService } from 'src/app/services/store.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { Voucher } from 'src/app/shared/models/voucher';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DistanceService } from 'src/app/services/distance.service';
import { DistanceBuyerService } from 'src/app/services/session/distance_buyer';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-newdishes',
  templateUrl: './newdishes.component.html',
  styleUrl: './newdishes.component.css'
})
export class NewdishesComponent {
  products: Product[]=[];
  voucher:Voucher[]=[];
  stores: Store[]=[];
  itemvoucher:any[]=[];

  constructor(
    private productserivce: ProductService,
    private router: Router, 
    private voucherService:VoucherService, 
    private storeService:StoreService, 
    activatedRouter: ActivatedRoute,
    private distanceService:DistanceService,
    private distanceBuyer:DistanceBuyerService
    
    
    ){
    let productObservable:Observable<any[]>
    

    activatedRouter.params.subscribe((params)=>{
      productObservable = productserivce.getRecentProduct();

      productObservable.subscribe ((serverProduct)=>{
        this.products=serverProduct
        this.loadAllStore()
      })
     
      this.loadvoucher()
    })
  }

  loadAllStore()
  {
    this.storeService.getAllStore().subscribe((item)=>{
      this.stores=item
    })
  }

  loadStore(idStore: string): Store | undefined {
    const matchingStores = this.stores.filter(item => item._id === idStore);
    return matchingStores.length > 0 ? matchingStores[0] : undefined;
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
  

  
  sort(event: Event) {
    const selected = (event.target as HTMLSelectElement).value;
  
    this.productserivce.getRecentProduct().subscribe((products) => {
      if (products) {
        if (selected === 'PriceAscending') {
          this.products = products.sort((a, b) => this.getMinPrice(a.DonGia) - this.getMinPrice(b.DonGia));
        } else if (selected === 'PriceDecrease') {
          this.products = products.sort((a, b) => this.getMinPrice(b.DonGia) - this.getMinPrice(a.DonGia));
        }
      } else {
        console.error("Cửa hàng hiện tại không phục vụ");
      }
    });
  }

  near_me() {
    this.productserivce.getRecentProduct().subscribe((products) => {
      if (products) {
        this.products = products.sort((a, b) => {
          const distanceA = +this.calMap(this.loadStore(a.MaCH)?.ToaDo ?? ''); // Convert to number
          const distanceB = +this.calMap(this.loadStore(b.MaCH)?.ToaDo ?? ''); // Convert to number
    
          const priceA = this.getMinPrice(a.DonGia);
          const priceB = this.getMinPrice(b.DonGia);
    
          // Check if ToaDo is defined before using it
          if (!isNaN(distanceA) && !isNaN(distanceB)) {
            return distanceA - distanceB || priceA - priceB;
          } else {
            console.error("Invalid map coordinates.");
            return 0;
          }
        });
      } else {
        console.error("Cửa hàng hiện tại không phục vụ");
      }
    });
  }
  
  getMinPrice(donGiaArray: any[]): number {
    let minPrice = donGiaArray[0].Gia;
  
    donGiaArray.forEach(donGia => {
      if (donGia.Gia < minPrice) {
        minPrice = donGia.Gia;
      }
    });
  
    return minPrice;
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
  
}