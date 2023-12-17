import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { StoreService } from 'src/app/services/store.service';
import { TypeService } from 'src/app/services/type.service';
import { Product } from 'src/app/shared/models/product';
import { Store } from 'src/app/shared/models/store';
import { Type } from 'src/app/shared/models/type';

@Component({
  selector: 'app-store-category',
  templateUrl: './store-category.component.html',
  styleUrls: ['./store-category.component.css']
})
export class StoreCategoryComponent implements OnInit {


  storeJWT!:Store
  store!:Store

  product:Product[]=[]
  productList:Product[]=[]

  tieumucs:Type[]=[];
  
  modifyProduct=false
  idProduct!:string;
  selectedRowIndex!: number;

  inputCategory!:string
  addNewCategory=false

  idStore!:string;
  constructor(
    private storeService:StoreService,
    private productService:ProductService,
    private typeService:TypeService,
    private sharedDataService:SharedDataService,
    private router:Router
  )
  {
    storeService.storeObservable.subscribe((newStore)=>{
      this.storeJWT=newStore
      this.loadStore()
      this.loadProduct();
    })
    
  }

  ngOnInit(): void {
   
   
  }


  addCategory()
{
  this.router.navigateByUrl('/storee/category/additional');
}


  loadStore()
  {
    this.storeService.getStorebyID(this.storeJWT._id).subscribe((store)=>{
      this.store=store
      this.loadProduct();
    })
  }



  loadProduct()
  {
    this.productService.getAllProductbyidStore(this.store._id).subscribe((product)=>{
      this.product=product
      this.productList=product
    })
  }

  loadCatebyID(idCate: string): string {
    const thucDon = this.store.ThucDons.find((item) => item._id === idCate);
    if (thucDon) {
      return thucDon.TenThucDon; 
    } else {
      return 'N/A'; 
    }
  }

  modifyCategory(idCategory:string)
  {
    this.router.navigateByUrl('/storee/category/modify/'+idCategory);
  }


  loadTieuMuc(){
    this.typeService.getAll().subscribe((type)=>{
        this.tieumucs=type;
    })
  }

  countCategory():Number
  {
    return this.store.ThucDons.length

  }




  countProduct_Cate(id: string): number {
    const productsWithMatchingId: Product[] = this.productList.filter((item) => item.MaThucDon === id);
  
    // Đếm số lượng sản phẩm có cùng id
    const count: number = productsWithMatchingId.length;
  
    return count;
  }

  modifyProduct_id(idProduct:string){

    this.modifyProduct = true;
    this.idProduct=idProduct;
  }
  
  
  closeAlert_ModifyProduct() {
    this.modifyProduct = false;
    window.location.reload();
  }
  
  closeAlert_ModifyProduct1(data: string) {
    this.modifyProduct = false;
    window.location.reload();
  }


  selectRow(index: number,id:string) {
    this.selectedRowIndex = index;

    this.product = this.productList.filter(item=>item.MaThucDon===id)
  }
  
  addNewCategoryy(){
  
   
    this.storeService.addCategory({
      IdStore:this.storeJWT._id,
      TenDanhMuc:this.inputCategory
    }).subscribe((item)=>{
      this.closeAddCategory()
      this.loadStore1()
      this.loadProduct1();
      
    })
 

  }


  loadStore1()
  {
    this.storeService.getStorebyID(this.storeJWT._id).subscribe((store)=>{
      this.store=store
      const lastCategory = this.store.ThucDons[this.store.ThucDons.length - 1];
      this.modifyCategory(lastCategory._id);
      this.loadProduct();
    })
  }


  loadProduct1()
  {
    this.productService.getAllProductbyidStore(this.store._id).subscribe((product)=>{
      this.product=product
      this.productList=product
    })
  }

//=================
closeAddCategory(){
  this.addNewCategory=false
}




 
}
