import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from 'src/app/shared/models/store';
import { Product } from 'src/app/shared/models/product';
import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent {

  result: string = "";

  store!:Store;
  productInfor:Product[]=[];
  idStore!:string;
  products: any[]=[]; //list product khi tìm kiếm
  constructor(
    private productService: ProductService,
    private storeService:StoreService,
    private router:Router,
    private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe((params) => {
      console.log('Params:', params);
      if (params.Searchname) {
        this.result = params.Searchname;
        this.getListProductbyName()
        this.getInforStore()
        this.getInforProductbyStore()
      }
    });
  }





  getInforProductbyStore() {
    
    this.productService.getAllProductbyidStore(this.idStore).subscribe((products) => {
      if (products) {
        this.productInfor = products;
        
      } else {
        console.error("Cửa hàng hiện tại không phục vụ");
      }
    });
  }


   countProducts(): number {
   
    return this.productInfor.length;
  }

  countMenus(menuArray: any[]): number {
  return menuArray.length;
  }



  getListProductbyName()
  {
    this.productService.getAllProductbyName(this.result).subscribe((products) => {
      this.products = products;
    });
  }
  

  getInforStore() //TÌM KIẾM THEO TÊN
  {
    this.storeService.getStorebyNameSearch(this.result).subscribe((store) => {
      this.idStore=store[0]._id;
      alert(this.idStore)
            this.store = store[0];
    });
  
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


  goToShop(idShop:string)
  {
    alert(idShop);
    this.router.navigateByUrl('/store/'+idShop);
  }
  
}
