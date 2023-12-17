import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';
import { StoreService } from 'src/app/services/store.service';
import { Payment } from 'src/app/shared/models/payment';
import { Store } from 'src/app/shared/models/store';

@Component({
  selector: 'app-store-order',
  templateUrl: './store-order.component.html',
  styleUrls: ['./store-order.component.css']
})
export class StoreOrderComponent {

  inforOrder: any[]=[];
  paymentLists:Payment[]=[];
  store!:Store;
 
  constructor(
    private router:Router,
    private orderService:OrderService, 
    private storeService:StoreService,
    private paymentService:PaymentService
    ){
    storeService.storeObservable.subscribe((newStore)=>{
      this.store=newStore;
      this.loadThongTinDonHang();
      this.loadPhuongThucTT();
    })

    
  }
  ngOnInit(): void {
    
  }

  dateToString(date: string): string {
    const dateObject = new Date(date);
    // You can format the date object using the `toLocaleString` method or other formatting options
    const formattedDate = dateObject.toLocaleString(); // Example formatting, adjust as needed
    return formattedDate;
  }
  
  
  countCancelOrder():number{
    return this.inforOrder.filter(product => product.TinhTrangDonHang === 'Đã hủy').length;
  }

  countDeliveringOrder():number{
    return this.inforOrder.filter(product => product.TinhTrangDonHang === 'Đang giao hàng').length;
  }

  countWaiting():number{
    return this.inforOrder.filter(product => product.TinhTrangDonHang === 'Chờ xác nhận').length;
  }

  countReceived():number{
    return this.inforOrder.filter(product => product.TinhTrangDonHang === 'Đã giao').length;
  }

  loadThongTinDonHang()
  {
    this.orderService.getAllOrderbyIdStore(this.store._id).subscribe((store) => {
      this.inforOrder = store;
    });
  }

  paymentOrder(idPayment: string): string {
    const foundPayment = this.paymentLists.find(item => item._id === idPayment);
    return foundPayment?.TenPhuongThuc.toString() ?? 'N/A';
  }

  orderDetail(idOrder:string)
  {
    this.router.navigateByUrl('/storee/order/'+idOrder);
  }
  
  



  loadPhuongThucTT()
  {
    this.paymentService.getAllPayment().subscribe((payments)=>{
      this.paymentLists=payments
    })
  }





}
