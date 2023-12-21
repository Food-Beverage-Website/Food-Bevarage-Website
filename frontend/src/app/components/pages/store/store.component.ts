
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { Product } from 'src/app/shared/models/product';
import { Store } from 'src/app/shared/models/store';
import { Voucher } from 'src/app/shared/models/voucher';
import * as L from 'leaflet';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  

})
export class StoreComponent implements OnInit {


  store!:Store; 
  idStore!:string;
  voucher:Voucher[]=[];
  itemvoucher:any[]=[];
  
  productInfor: Product[] = [];
  product: Product[] = [];
  pagedProducts!: Product[];
  pageSize = 9; 
  currentPage = 1; 
  totalItems!:number;


  
  map!: L.Map;

  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService:StoreService,
    private productService: ProductService,
    private voucherService:VoucherService,
    private router:Router
    ){
      this.activatedRoute.params.subscribe((params) => {
        console.log('Params:', params);
        if (params.idStore) {
         this.idStore=params.idStore;
         
        }
      });
  
      this.getInforStore();
      this.getInforProductbyStore();
      this.getAllProductbyStore();
      this.loadvoucher();
    
  
  }

  

  ngOnInit(): void {
   
    
  }

  initializeMap(): void {
    // Các thiết lập của bản đồ
    const [latitude, longitude] = this.store.ToaDo.split(',').map(Number);
   
    this.map = L.map('map').setView([latitude, longitude], 12);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  
    // Tạo một biểu tượng marker mới
    const customIcon = L.icon({
      iconUrl: 'https://www.clearlyexpress.com/assets/img/front-end/pin.svg',  // Đường dẫn đến hình ảnh marker
      iconSize: [32, 32],  // Kích thước của hình ảnh
      iconAnchor: [16, 32],  // Vị trí mà marker sẽ "chạm" bản đồ
      popupAnchor: [0, -32]  // Vị trí của popup liên quan đến marker
    });
  
    L.marker([latitude, longitude], { icon: customIcon }).addTo(this.map)
      .bindPopup('Đây là vị trí được chọn.')
      .openPopup();
  }

  getInforStore()
  {
    this.storeService.getStorebyID(this.idStore).subscribe((store) => {
      this.store = store;
      this.initializeMap()
      
    });
    
  }
  

 



  getVoucherProduct() {
    this.product = this.productInfor.filter(item => this.checkvoucherProduct(item._id) === 1);
    this.totalItems = this.countProducts();
    this.updatePagedProducts();
  }
  
  loadvoucher(){
   
    this.voucherService.getVoucerbyID(this.idStore).subscribe((item)=>{
      
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
  
  buy(id:string){
    this.router.navigateByUrl('/detailproduct/'+id);
  }
  
  soldout(){
    alert("Sản phẩm đã bán hết")
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
  
  

  pageChanged(event: any): void {
    console.log('Event:', event); 
    this.currentPage = event;
    this.updatePagedProducts();
  }

  updatePagedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.product.slice(startIndex, endIndex);
  }



  getInforProductbyStore(){
    this.productService.getAllProductbyidStore(this.idStore).subscribe((products) => {
      if (products) {
        this.productInfor = products;
      } else {
        console.error("Cửa hàng hiện tại không phục vụ");
      }
    });
  }

  getAllProductbyStore(){
    this.productService.getAllProductbyidStore(this.idStore).subscribe((products) => {
      if (products) {
        this.product = products;
        this.totalItems = this.countProducts(); // Di chuyển đến đây
        this.updatePagedProducts(); // Di chuyển đến đây
      } else {
        console.error("Cửa hàng hiện tại không phục vụ");
      }
    });
  }


  getNewProduct() {
    this.productService.getAllProductbyidStore(this.idStore).subscribe((products) => {
      if (products) {
        // Lọc ra các sản phẩm mới
        this.product = products.filter(item => this.checkNew(item.NgayDang));
        this.totalItems = this.countProducts(); // Di chuyển đến đây
        this.updatePagedProducts(); // Di chuyển đến đây
      } else {
        console.error("Cửa hàng hiện tại không phục vụ");
      }
    });
  }


  sort(event: Event) {

    const selected = (event.target as HTMLSelectElement).value;

    this.productService.getAllProductbyidStore(this.idStore).subscribe((products) => {
      if (products) {

        if(selected==='PriceAscending')
        {
          this.product = products.sort((a, b) => a.DonGia[0].Gia- b.DonGia[0].Gia);
          
        }
        else if(selected==='PriceDecrease'){
          this.product = products.sort((a, b) => b.DonGia[0].Gia- a.DonGia[0].Gia);
        }

        this.totalItems = this.countProducts(); // Di chuyển đến đây
        this.updatePagedProducts(); // Di chuyển đến đây
      } else {
        console.error("Cửa hàng hiện tại không phục vụ");
      }
    });
  }

  checkNew(ngayDang: string): boolean {
    const [ngay, thang, nam] = ngayDang.split('/');
    const ngayDangFormatted = `${nam}-${thang}-${ngay}`;
  
    const ngayDangDate = new Date(ngayDangFormatted);
    const ngayHienTai = new Date();
    const diffInDays = Math.floor((ngayHienTai.getTime() - ngayDangDate.getTime()) / (1000 * 3600 * 24));
  
    return diffInDays <= 2;
  }

  countProducts(): number {
    return this.productInfor.length;
  }

  countMenus(menuArray: any[]): number {
  return menuArray.length;
  }


  productbyMenu(idMenu: string) {
  
    this.productService.getProductbyIdMenu(idMenu).subscribe((products) => {
      if (products) {
        this.product = products;
        this.totalItems = this.countProducts();
        this.updatePagedProducts();
      } else {
        console.error("Không có sản phẩm nào cho menu này");
      }
    });
  }

  productbyMenu_dropdown(event: Event) {
    const idMenu = (event.target as HTMLSelectElement).value;
    if(idMenu !== 'all')
    {
      this.router.navigateByUrl('/' + idMenu);
        this.productService.getProductbyIdMenu(idMenu).subscribe((products) => {
          if (products) {
            this.product = products;
            this.totalItems = this.countProducts();
            this.updatePagedProducts();
          } else {
            console.error("Không có sản phẩm nào cho menu này");
          }
        });
    }else{
      this.getAllProductbyStore();
    }
  }


  getBestSeller(){
    
    this.productService.getProductBestSellerbyIDStore(this.idStore).subscribe((products) => {
      this.product=products;
      this.totalItems = this.countProducts();
      this.updatePagedProducts();
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

 
}
