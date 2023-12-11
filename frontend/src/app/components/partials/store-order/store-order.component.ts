import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/shared/models/store';

@Component({
  selector: 'app-store-order',
  templateUrl: './store-order.component.html',
  styleUrls: ['./store-order.component.css']
})
export class StoreOrderComponent {

  inforOrder: any[]=[];
  store!:Store;
 
  constructor(private router:Router, private orderService:OrderService, private storeService:StoreService){
    storeService.storeObservable.subscribe((newStore)=>{
      this.store=newStore;
      this.loadThongTinDonHang();
    })

    
  }
  ngOnInit(): void {
    
  }

  
  countCancelOrder():number{
    return this.inforOrder.filter(product => product.TinhTrangDonHang === 'Đã hủy').length;
  }

  countWaiting():number{
    return this.inforOrder.filter(product => product.TinhTrangDonHang === 'Chờ xác nhận').length;
  }

  loadThongTinDonHang()
  {
    this.orderService.getAllOrderbyIdStore(this.store._id).subscribe((store) => {
      this.inforOrder = store;
    });
  }





}
