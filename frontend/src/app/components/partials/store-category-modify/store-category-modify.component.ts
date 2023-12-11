import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { ProductService } from 'src/app/services/product.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { StoreService } from 'src/app/services/store.service';
import { Product } from 'src/app/shared/models/product';
import { Store } from 'src/app/shared/models/store';

@Component({
  selector: 'app-store-category-modify',
  templateUrl: './store-category-modify.component.html',
  styleUrls: ['./store-category-modify.component.css']
})
export class StoreCategoryModifyComponent implements OnInit{

  idCategory!:string
  idNoneCategory!:string

  storeJWT!:Store;
  store!:Store;
  products:Product[]=[]
  noneproducts:Product[]=[]

  inputName!:string;

  selectedApppliedProducts: string[] = [];
  selectedNoneProducts: string[] = [];

  removeMenu=false

  constructor(
    private sharedDataService:SharedDataService,
    private productService:ProductService,
    private storeService:StoreService,
    private menuService:MenuService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ){
    this.storeService.storeObservable.subscribe((newStore)=>{
      this.storeJWT=newStore;
      this.loadStore()
    })

   
  }

  ngOnInit(): void {
   this.loadNameCategory1()
  }

  loadStore()
  {
    this.storeService.getStorebyID(this.storeJWT._id).subscribe((store)=>{
      this.store=store
      this.loadProduct();
      this.activatedRoute.params.subscribe((params) => {
    
        if (params.name) {
          this.idCategory = params.name;
          this.loadNameCategory1()
        }
      });
    })
  }


  updateMenu(){
    this.menuService.updateNameMenu({
      Id:this.store._id, 
      idThucDon:this.idCategory,
      TenThucDon:this.inputName
    }).subscribe((any)=>{
      this.loadStore()
    })
  }

 loadNameCategory(): string {
  
    const foundItem = this.store.ThucDons.find(item => item._id === this.idCategory);
   
    
    return foundItem ? foundItem.TenThucDon : 'Not Found';
  }

  loadNameCategory1() {
  
    const foundItem = this.store.ThucDons.find(item => item._id === this.idCategory);
    this.inputName=foundItem ? foundItem.TenThucDon : 'Not Found';
    
    
  }





  loadProduct(){
    this.productService.getAllProductbyidStore(this.store._id).subscribe((product)=>{
      this.products=product.filter(item=>item.MaThucDon===this.idCategory)
      const foundItem = this.store.ThucDons.find(item => item.TenThucDon==='Tất cả');
      this.idNoneCategory = foundItem ? foundItem._id : 'defaultId';
      this.noneproducts=product.filter(item=>item.MaThucDon===foundItem?._id)
    })
  }


  save_1(index:number){
    const itemId = this.products[index]._id;
  
    
    const indexInArray = this.selectedApppliedProducts.indexOf(itemId);
    
    if (indexInArray === -1) {
     
      this.selectedApppliedProducts.push(itemId);
    } else {
     
      this.selectedApppliedProducts.splice(indexInArray, 1);
    }
  }


  save_2(index:number){
    const itemId = this.noneproducts[index]._id;
  
    
    const indexInArray = this.selectedNoneProducts.indexOf(itemId);
    
    if (indexInArray === -1) {
     
      this.selectedNoneProducts.push(itemId);
    } else {
     
      this.selectedNoneProducts.splice(indexInArray, 1);
    }
  }

  save_table_1()
  {
   
    this.menuService.patchMenu({idMenu:this.idNoneCategory,listID:this.selectedApppliedProducts }).subscribe((any)=>{
      this.loadProduct()
    })
    this.selectedApppliedProducts=[]
  }


  deleteMenu(){
    //Chuyển các sản phẩm sang none
    this.selectedApppliedProducts = this.products
    .filter((item) => item.TinhTrang)
    .map((product) => product._id);

    this.menuService.patchMenu({idMenu:this.idNoneCategory,listID:this.selectedApppliedProducts }).subscribe((any)=>{
      this.loadProduct()
    })
    //Thực hiện xóa menu
    this.menuService.deleteNameMenu({_id:this.store._id,idmenu:this.idCategory}).subscribe((any)=>{
      this.router.navigateByUrl('/storee/category');
    })

  }

  save_table_2()
  {
    
    this.menuService.patchMenu({idMenu:this.idCategory,listID:this.selectedNoneProducts }).subscribe((any)=>{
      this.loadProduct()
    })
    this.selectedNoneProducts=[]
  }

  closeAlert_removeMenu() {
    this.removeMenu = false;
    
  }

  opentAlert_removeMenu() {
    this.removeMenu = true;
    
  }





}
