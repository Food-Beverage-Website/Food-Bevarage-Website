import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderService } from 'src/app/services/order.service'
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';
import { ToppingService } from 'src/app/services/topping.service';
import { User } from 'src/app/shared/models/user';
import { take } from 'rxjs/operators';
import { Order } from 'src/app/shared/models/order';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css'],
})

export class UserOrderComponent {
  orders: any[]=[];
  sanphamData:any[]=[];
  storeData:any[]=[];
  toppingData:any[]=[];
  result: string="";
  user!:User;
  isVisible: boolean = true;
  @Input() tabs: string [] = ['Tất cả','Chờ xác nhận','Đang giao hàng', 'Đã nhận', 'Đã hủy'];
  @Output() onTabChange = new EventEmitter<number>();
  activatedTab = 1;
  constructor(private toastr: ToastrService, private orderservice: OrderService,private router: ActivatedRoute, private userservice: UserService , private productservice: ProductService, private storeservice: StoreService, private toppingservice: ToppingService)
  {
    userservice.userObservable.subscribe((newUser)=>{
      this.user= newUser;
    });
    this.router.params.subscribe((params) =>
    {
     if(this.user._id){
      this.result = this.user._id;
      this.orderservice.getAllOrdersByUser(this.result).subscribe((orders)=>{
        this.orders = orders
      });
     }
    });
  }
  ngOnInit() {
    // Lấy dữ liệu từ collection sanpham
    this.productservice.getAllProduct().subscribe((data) => {
      this.sanphamData = data;
    });
    this.storeservice.getAllStore().subscribe((data)=>{
      this.storeData = data;
    });
    this.toppingservice.getAllTopping().subscribe((data) => {
      this.toppingData = data;
    });
  }
  toggleCollapse(index: number): void {
    const order = this.orders[index];
    if (order) {
      order.showDetails = !order.showDetails;
    }
  }
  getProductName(maSanPham: string): string {
    const product = this.sanphamData.find(item => item._id === maSanPham);
    return product ? product.TenSP: 'Tên không xác định';
  }
  getStoreName(maStore: string): string{
    const store = this.storeData.find(item => item._id === maStore);
    return store ? store.TenCuaHang: 'Tên không xác định';
  }
  getToppingName(maStore: string, maTopping: string): string{
    const topping = this.toppingData.find(item => item.MaCH === maStore && item.Topping.some((t: any) => t._id === maTopping));
   
    return topping && topping.Topping ? topping.Topping.find((t: any) => t._id === maTopping)?.tentopping  : null
  }
  setTab(index:number){
    this.activatedTab = index;
    this.onTabChange.emit(this.activatedTab);
  }
  cancelOrder(maDonHang: string): void {
    this.orderservice.cancelOrder(maDonHang).subscribe((Order)=>{
      console.log('Đã hủy đơn hàng thành công', Order);
      window.location.reload();
    },
  )}

  xacThucOrder(maDonHang: string): void {
    this.orderservice.xacNhanOrder(maDonHang).subscribe((Order)=>{
      console.log('Xác nhận đơn hàng đã giao thành công', Order);
      this.toastr.success('Xác nhận đơn đã giao thành công', 'Thông báo!');

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
  )}
}