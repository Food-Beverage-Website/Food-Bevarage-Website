import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/shared/models/store';

@Component({
  selector: 'app-notifications-store',
  templateUrl: './notifications-store.component.html',
  styleUrls: ['./notifications-store.component.css']
})
export class NotificationsStoreComponent implements OnInit{

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
 

  loadThongTinDonHang()
  {
    this.orderService.getOrderUnconfirm(this.store._id).subscribe((store) => {
      this.inforOrder = store;
    });
  }

  showOrder(){
    this.router.navigateByUrl('/storee/order');
  }


}
