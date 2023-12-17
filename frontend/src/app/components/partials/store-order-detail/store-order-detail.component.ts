import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { ToppingService } from 'src/app/services/topping.service';
import { Product } from 'src/app/shared/models/product';
import { Topping } from 'src/app/shared/models/topping';

@Component({
  selector: 'app-store-order-detail',
  templateUrl: './store-order-detail.component.html',
  styleUrls: ['./store-order-detail.component.css']
})
export class StoreOrderDetailComponent implements OnInit {

  idOrder!: string;
  order!: any
  product:Product []=[]
  idstore!: string;
  topping!:Topping
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private productService:ProductService,
    private toppingService:ToppingService

  ) {
    this.activatedRoute.params.subscribe((params) => {
    
      if (params.name) {
        this.idOrder = params.name; 
        this.loadOrder();
       
      }
    });
  }

  loadOrder() {
  
    this.orderService.getAllOrderbyIdOrder(this.idOrder).subscribe((item) => {
     
      this.order = item[0];
      this.idstore=item[0].MaCH;
      this.loadAllSanPham();
     
    });
  }

  loadAllSanPham(){
   
    this.productService.getAllProductbyidStore(this.idstore).subscribe((item) => {
      this.product=item
      this.loadAllTopping()
    });
  }

  loadAllTopping()
  {
    this.toppingService.getToppingbyIDStore(this.idstore).subscribe((item)=>{
    
      this.topping=item[0]
    })
  }

  isTopping(topping:any[]): boolean {
    
    if(topping.length===0)
    {
      return false
    }
    else{
      return true
    }
 
  }

  loadTopping(idTB: string): string {
    const foundTopping = this.topping.Topping.find(item => item._id === idTB);
  
    return foundTopping ? foundTopping.tentopping : 'N/A';
  }


  loadSanPham(idSP: string): string {

    const foundProduct = this.product.find(item => item._id === idSP);
    return foundProduct ? foundProduct.TenSP : 'N/A';
  }

  sum(sl:number, dg:number):number{
    return sl*dg
  }

  setState(idOrder:string,state:string){

    this.orderService.updateOrder({
      _id:idOrder,
      TinhTrang:state
    }).subscribe((item)=>{
      this.loadOrder();
    })
  }

 
  

  ngOnInit(): void {

  }
}
