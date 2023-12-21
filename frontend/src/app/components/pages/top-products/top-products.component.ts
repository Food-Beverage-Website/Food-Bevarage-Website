import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Store } from 'src/app/shared/models/store';
import { StoreService } from 'src/app/services/store.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { Voucher } from 'src/app/shared/models/voucher';
import { Observable, forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrl: './top-products.component.css'
})
export class TopProductsComponent {

  products: any[]=[];
  voucher:Voucher[]=[];
  stores: Store[]=[];
  itemvoucher:any[]=[];
  constructor(private productserivce: ProductService,private router: Router, private voucherService:VoucherService, private storeService:StoreService, activatedRouter: ActivatedRoute ){
    activatedRouter.params.subscribe((params)=>{
      this.productserivce.getTopProducts().subscribe((data)=>{
        this.products = data;
      });
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
  getMinPrice(donGiaArray: any[]): number {
    let minPrice = donGiaArray[0].Gia; // Giả sử giá đầu tiên là nhỏ nhất

    donGiaArray.forEach(donGia => {
      if (donGia.Gia < minPrice) {
        minPrice = donGia.Gia;
      }
    });

    return minPrice;
  }
}