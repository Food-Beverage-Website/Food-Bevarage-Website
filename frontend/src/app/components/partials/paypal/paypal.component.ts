import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {


  @Input() dataPayment!:any
  @Input() tongTien!:number
 
  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;

  constructor(private router:Router, private orderService: OrderService, private toastr: ToastrService) {}

  ngOnInit(): void {

  
      if (this.paypalElement && this.paypalElement.nativeElement) {
        paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: 'CAD',
                    value: this.tongTien
                  },
                },
              ],
            });
          },
          onApprove: async (data: any, actions: any) => {
            const payment = await actions.order.capture();
            this.dataPayment.paymentId = payment.id;
            this.orderService.oder_GioHang(this.dataPayment).subscribe(
              (response) => {
                console.log('Đặt hàng thành công:', response);
                this.toastr.success('Payment Saved Successfully', 'Thông báo!');

                setTimeout(() => {
                  this.router.navigateByUrl('/user/ordered');
                }, 5000);
          

              },
              (error) => {
                console.error('Lỗi đặt hàng:', error);
                this.toastr.error('Lỗi đặt hàng!', 'Thông báo lỗi!');
              }
            );
          },
          onError: (err: any) => {
            console.error('Payment Error:', err);
            this.toastr.error('Payment Failed', 'Error');
          },
        }).render(this.paypalElement.nativeElement);
      } else {
        console.error('Element with ID "paypal" not found or is undefined.');
      }
   
  }
  
  


}
