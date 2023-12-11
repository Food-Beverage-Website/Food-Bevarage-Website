import { Component, DoCheck, EventEmitter, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';
import { TypeService } from 'src/app/services/type.service';
import { Product } from 'src/app/shared/models/product';
import { Store } from 'src/app/shared/models/store';
import { Type } from 'src/app/shared/models/type';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';


@Component({
  selector: 'app-store-product',
  templateUrl: './store-product.component.html',
  template: `<app-store-product-additional [tieumuc]=""></app-app-store-product-additional>`,
  styleUrls: ['./store-product.component.css']
})
export class StoreProductComponent  {

  store!:Store;
  productsList:Product[]=[];
  products:Product[]=[];
  selectedRow: number | null = null;
  isRowVisible: boolean[] = Array(this.productsList.length).fill(false);
  addNewProduct = false;
  modifyProduct = false;
  isProduct=true;
  isTopping=false;

  urllink:string="assets/Images/default.png"
  tieumucs:Type[]=[];
  idProduct!:string;

  inputType!:string;
  inputProductName!:string;
  inputDescribed!:string;
  inputCategory!:string;
  inputState!:string;
  inputImg!:string;
  inputPrice: { Size: string, Gia: string }[] = [{ Size: '', Gia: '' }];


  @Output() dataEvent = new EventEmitter<string>();
  constructor(
    private storeService: StoreService,
    private productService:ProductService,
    private typeService:TypeService,
    private router:Router,
    private toastrService:ToastrService,
    private sharedDataService: SharedDataService, 
    ){
    storeService.storeObservable.subscribe((newStore)=>{
      this.store=newStore;
      this.loadProductList();
      this.loadTieuMuc();
    })
  }





  // Hàm xử lý sự kiện click để ẩn/hiện dòng
  handleRowClick(index: number): void {
    this.isRowVisible[index] = !this.isRowVisible[index];
  }

  showAllProduct(){
    this.productsList=this.products;
  }
 
  showProduct(){
    this.productsList = this.products.filter(item=>item.TinhTrang==='Hoạt động')
  }

  hideProduct(){
    this.productsList = this.products.filter(item=>item.TinhTrang==='Ẩn')
  }

  soldoutProduct(){
    this.productsList = this.products.filter(item=>item.TinhTrang==='Hết hàng')
  }


loadProductList()
{
  this.productService.getAllProductbyidStore(this.store._id).subscribe((products) => {
    if (products) {
      this.products = products;
      this.productsList=products;
    } else {
      console.error("Cửa hàng hiện tại không phục vụ");
    }
  });
}

loadCategory()
{
  this.productService.getAllProductbyidStore(this.store._id).subscribe((products) => {
    if (products) {
      this.products = products;
      
    } else {
      console.error("Cửa hàng hiện tại không phục vụ");
    }
  });
}

onCategoryChange(event: any) {
  const selectedCategory = event.target.value;
  if(selectedCategory==='Tất cả')
  {
    this.productsList=this.products;
  }
  else{
    this.productsList=this.products.filter(item=>item.MaThucDon===selectedCategory)
  }

}

countProduct():number{
  return this.products.filter(product => product.TinhTrang === 'Hoạt động').length;
}

countHideProduct():number{
  return this.products.filter(product => product.TinhTrang === 'Ẩn').length;
}

countSoldOutProduct():number{
  return this.products.filter(product => product.TinhTrang === 'Hết hàng').length;
}


countPosted():number{
  return this.products.length;
}
  
getNameCaterogyByID(IDCate:string):string{
  
  const thucDon = this.store.ThucDons.find(item => item._id === IDCate);

  const result= thucDon ? thucDon.TenThucDon : 'Unknown Category';

  if(result==='Tất cả')
  {
    return 'N/A';
  }
  return result;
}


addInput() {
  this.inputPrice.push({ Size: '', Gia: '' });
}

removeItem(index: number): void {
 
  this.inputPrice.splice(index, 1);
}


handleFileInput(event: any) {
  const url="assets/Images/"
  const files = event.target.files;
  if (files && files.length > 0) {
    const hinh = files[0].name;
    this.inputImg=hinh;
    this.urllink = url+hinh;
    
  }
}


loadTieuMuc(){
  this.typeService.getAll().subscribe((type)=>{
      this.tieumucs=type;
  })
}



additionalProduct(){

  this.sharedDataService.setDatatoAddProduct(this.tieumucs,this.store);
  this.router.navigateByUrl('/storee/product/additional');
}


checkText():boolean
{
  if(!this.inputDescribed || !this.inputProductName )
  {
    return false;
  }
  
  for (const item of this.inputPrice) {
    if (!item.Gia || !item.Size) {
      return false;
    }
  }



  return true;

}



submitProduct(){

  if(this.checkText()==false)
  {
  
    alert("Vui lòng nhập dữ liệu đầy đủ")
  }
  else
  {
    const currentDate = new Date();
    const ngayDangValue: string | undefined = currentDate.toLocaleDateString()?.toString();
   
    this.productService.postNewProduct({
      TenSP:this.inputProductName,
      MieuTa:this.inputDescribed,
      DonGia:this.inputPrice,
      Hinh:this.inputImg,
      NgayDang:ngayDangValue,
      MaCH:this.store._id,
      MaThucDon:this.inputCategory,
      MaTieuMuc:this.inputType,
      TinhTrang:this.inputState
     }).subscribe(()=>{
     
     })
     this.router.navigateByUrl('/storee/infor');
   
  }
  
}

modifyProduct_id(idProduct:string){

  this.modifyProduct = true;
  this.idProduct=idProduct;
}


closeAlert_ModifyProduct() {
  this.modifyProduct = false;
  this.inputPrice=[{ Size: '', Gia: '' }]; 
  window.location.reload();
}

closeAlert_ModifyProduct1(data: string) {
  this.modifyProduct = false;
  this.inputPrice=[{ Size: '', Gia: '' }]; 
  window.location.reload();
}


closeAlert() {
  this.addNewProduct = false;
  this.inputPrice=[{ Size: '', Gia: '' }]; 
  window.location.reload();

}



issProduct(){
  this.isProduct=true;
  this.isTopping=false;
}

issTopping()
{
  this.isProduct=false;
  this.isTopping=true;
}
}
