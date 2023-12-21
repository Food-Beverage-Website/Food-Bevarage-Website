import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { window } from 'rxjs';
import { TypeService } from 'src/app/services/type.service';
import { Type } from 'src/app/shared/models/type';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/product';
import { Voucher } from 'src/app/shared/models/voucher';
import { VoucherService } from 'src/app/services/voucher.service';
import { DistanceService } from 'src/app/services/distance.service';
import { DistanceBuyerService } from 'src/app/services/session/distance_buyer';
import { Store } from 'src/app/shared/models/store';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'] // Corrected property name
})
export class ProductCategoryComponent implements OnInit {

  nameCategory!: string;
  idCategory!:String|null;
  
  voucher:Voucher[]=[];
  types: Type[] = [];
  type!: Type | null;
  banner!:String

  product:any[]=[];
  stores: Store[]=[];
  constructor(
   
    private activatedRoute: ActivatedRoute,
    private typeService: TypeService,
    private router:Router,
    private productserivce: ProductService,
    private productService:ProductService,
    private voucherService:VoucherService,
    private storeService:StoreService, 
    private distanceService:DistanceService,
    private distanceBuyer:DistanceBuyerService
  ) {

    this.activatedRoute.params.subscribe((params) => {
    
      if (params.name) {
        
        this.nameCategory = params.name;
        if(this.nameCategory==='Hạt'){
          this.banner="pexels-free-creative-stuff-5649204 (2160p).mp4"
        }
        if(this.nameCategory==='Trà'){
          this.banner="production_id_4260171 (1440p).mp4"
         
        }
        if(this.nameCategory==='Sữa'){
          this.banner="production_id_4779866 (1080p).mp4"
        }
        if(this.nameCategory==='Trái cây'){
          this.banner="video (2160p).mp4"
        }
        if(this.nameCategory==='Yogurt'){
          this.banner="pexels-ron-lach-7791621 (2160p).mp4"
        }
        if(this.nameCategory==='Soda'){
          this.banner="pexels_videos_2776521 (2160p).mp4"
        }
        if(this.nameCategory==='Cà phê'){
          this.banner="production_id_4815784 (720p).mp4"
        }
      }


    });


  
  }

  ngOnInit(): void {
  

    this.typeService.getAll().subscribe((items) => {
   
      this.types = items;
      this.type = this.types.find(types => types.TenTieuMuc=== this.nameCategory) ?? null;
      this.idCategory=this.type?._id??null
      this.loadProduct();
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
  



  loadProduct()
  {
    this.productService.getALLProduct_2().subscribe((item)=>{
      this.product=item.filter(item=>item.MaTieuMuc===this.idCategory)

    })

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



  
  loadStore(idStore: string): Store | undefined {
    const matchingStores = this.stores.filter(item => item._id === idStore);
    return matchingStores.length > 0 ? matchingStores[0] : undefined;
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

  loadvoucher(){
  
    
    this.voucherService.getAllVoucher().subscribe((item)=>{
    
      this.voucher = item
    
    })
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



  getTieuMuc(id: string): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/category/' + id]);
    });
  }




}


