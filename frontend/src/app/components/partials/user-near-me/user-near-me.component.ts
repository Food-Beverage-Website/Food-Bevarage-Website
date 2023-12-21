import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DistanceService } from 'src/app/services/distance.service';
import { ProductService } from 'src/app/services/product.service';
import { DistanceBuyerService } from 'src/app/services/session/distance_buyer';
import { map } from 'rxjs/operators';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/shared/models/store';
import { Voucher } from 'src/app/shared/models/voucher';
import { Product } from 'src/app/shared/models/product';
import { Observable, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-user-near-me',
  templateUrl: './user-near-me.component.html',
  styleUrl: './user-near-me.component.css'
})
export class UserNearMeComponent implements OnInit{
  storeJWT !:Store
  store !:Store
  product:any[]=[]
  voucher:Voucher[]=[];
  provinces!:string[];
  provinces1!:string[];

  checked_provinces!:string[];
  selectedProvinces: string[] = [];
  originalProducts: any[] = [];

  priceMin!:number
  priceMax!:number

  search!:string

  constructor(
   private storeService: StoreService,
   private productService:ProductService,
   private router:Router,
   private distanceService:DistanceService,
   private distanceBuyer:DistanceBuyerService,

  )
  {
   


    this.loadProduct()
    


  }

  loadProduct()
  {
    this.productService.getAllProduct().subscribe((item)=>{
     
      this.originalProducts =item
      this.product = [...this.originalProducts]; 
      this.getprovince()
      
    })
  }
 

  ngOnInit(): void {
    
  }

  getUniqueProvinces(tinh:string[]): string[] {
    // Use a Set to filter out duplicates
    const uniqueSet = new Set(tinh);
    // Convert Set back to an array
    return Array.from(uniqueSet);
  }


  searchProduct()
  {
    if(!this.search)
    {
       return;
    }


    this.product = this.originalProducts.filter(item=>item.TenSP.toLowerCase().includes(this.search.toLowerCase()))
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



  filterPrice() {
  
    const effectivePriceMin = this.priceMin || 0;
    const effectivePriceMax = this.priceMax || Number.MAX_SAFE_INTEGER;
  
 
    this.product = this.product.filter(item => {
    
      return item && this.getMinPrice(item.DonGia) >= effectivePriceMin&& this.getMinPrice(item.DonGia)  <= effectivePriceMax;
    });
  }



  near_me() {
  
    this.product = this.product.sort((a, b) => {
      const distanceA = +this.calMap(a.MaCH.ToaDo ?? ''); // Convert to number
      const distanceB = +this.calMap(b.MaCH.ToaDo ?? ''); // Convert to number

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
 

}

sort(event: Event) {
  const selected = (event.target as HTMLSelectElement).value;

      if (selected === 'PriceAscending') {
        this.product = this.product.sort((a, b) => this.getMinPrice(a.DonGia) - this.getMinPrice(b.DonGia));
      } else if (selected === 'PriceDecrease') {
        this.product = this.product.sort((a, b) => this.getMinPrice(b.DonGia) - this.getMinPrice(a.DonGia));
      }
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


  calMap_num(toado: string): number {
   
    const latB = this.distanceBuyer.currentLatitude;
    const lonB = this.distanceBuyer.currentLongitude;
    
    if (latB !== 0 && lonB !== 0) {
        const [latA, lonA] = toado.split(',').map(parseFloat); 
        const distance = this.distanceService.calculateDistance(latA, lonA, latB, lonB);
        return parseFloat(distance.toFixed(2)); // Convert to number and fix decimal places
    }
    
    return 0; // Adjust the default return value based on your needs
}

onCheckboxChange(itemm: string): void {
  // Toggle selection
  if (this.selectedProvinces.includes(itemm)) {
    this.selectedProvinces = this.selectedProvinces.filter(p => p !== itemm);
  } else {
    this.selectedProvinces.push(itemm);
  }

  // Filter products based on selected provinces
  this.product = this.originalProducts.filter(item =>
    this.selectedProvinces.some(selectedProvince =>
      item.MaCH.DiaChi.toLowerCase().includes(selectedProvince.toLowerCase())
    )
  );
}






  getprovince()
  {
    this.product.forEach(element => {
      const toado =element.MaCH.ToaDo.toString();
     
      
     if(this.calMap_num(element.MaCH.ToaDo)<4.0)
     {
      const [latA, lonA] = toado.split(',').map(parseFloat); 
      this.distanceService.getAddress(latA, lonA).subscribe((item) => {
       
     
        if(item.address.quarter )
        {
       
          this.provinces.push(item.address.quarter )
        }
        else if(item.address.suburb)
        {
        
          this.provinces.push(item.address.suburb )
        }
      });
    }
    
    });
    
    this.provinces = [...new Set(this.provinces)];

   
  }

  
}
