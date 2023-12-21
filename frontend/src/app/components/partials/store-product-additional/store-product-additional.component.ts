import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { StoreService } from 'src/app/services/store.service';
import { TypeService } from 'src/app/services/type.service';
import { Store } from 'src/app/shared/models/store';
import { Type } from 'src/app/shared/models/type';
@Component({
  selector: 'app-store-product-additional',
  templateUrl: './store-product-additional.component.html',
  styleUrls: ['./store-product-additional.component.css']
})
export class StoreProductAdditionalComponent implements OnInit {

 tieumucs:Type[]=[]

 storeJWT!:Store
 store!:Store

 inputType!:string;
 inputProductName!:string;
 inputDescribed!:string;
 inputCategory!:string;
 inputState!:string;
 inputImg!:string;
 inputPrice: { Size: string, Gia: string }[] = [{ Size: '', Gia: '' }];

 addNewCategory=false

  urllink:string="assets/Images/default.png"
  constructor(
    private sharedDataService: SharedDataService,
    private productService:ProductService,
    private storeService:StoreService,
    private typeService:TypeService
    
    ) {
      storeService.storeObservable.subscribe((newStore)=>{
        this.storeJWT=newStore;
        this.loadStore()
        this.loadTieuMucs();
      })
  

  }

  loadStore(){
    this.storeService.getStorebyID(this.storeJWT._id).subscribe((item)=>{
      this.store=item
    })
  }




  loadTieuMucs(){
    this.typeService.getAll().subscribe((type)=>{
      this.tieumucs=type
    })
  }




  ngOnInit(): void {
  
  
  }


  
  addNewCategoryy(){
  
   
    this.storeService.addCategory({
      IdStore:this.store._id,
      TenDanhMuc:this.inputCategory
    }).subscribe((item)=>{
      this.closeAddCategory()
      this.loadStore()
      
    })
 

  }


  closeAddCategory(){
    this.addNewCategory=false
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

  addInput() {
    this.inputPrice.push({ Size: '', Gia: '' });
  }
  
  removeItem(index: number): void {
    
    if(this.inputPrice.length!==1){
      this.inputPrice.splice(index, 1);
    }
   
   
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
   
    const [ thang, ngay, nam] = ngayDangValue.split('/');
    const ngayDangFormatted = `${ngay}/${thang}/${nam}`;

    this.productService.postNewProduct({
      TenSP:this.inputProductName,
      MieuTa:this.inputDescribed,
      DonGia:this.inputPrice,
      Hinh:this.inputImg,
      NgayDang:ngayDangFormatted,
      MaCH:this.store._id,
      MaThucDon:this.inputCategory,
      MaTieuMuc:this.inputType,
      TinhTrang:this.inputState
     }).subscribe(()=>{
     
     })
   
   
  }
  
}

}
