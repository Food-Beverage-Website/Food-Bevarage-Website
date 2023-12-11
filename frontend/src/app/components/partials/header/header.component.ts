
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';
import { Store } from 'src/app/shared/models/store';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent implements OnInit {

  user!:User;
  store!:Store;
  countInfor!:number;

  isSubMenuVisible = false;
  constructor(private orderService:OrderService,private router:Router, private userService:UserService, private storeService:StoreService){
  
    userService.userObservable.subscribe((newUser)=>{
      this.user= newUser;
    })

    storeService.storeObservable.subscribe((newStore)=>{
      this.store=newStore;
      this.loadSL_Shop();
    })
  }

  ngOnInit(): void {
   
  }

  cartUser():void{
    this.router.navigateByUrl('/cart_page');
  }

  login():void{
    
      this.router.navigateByUrl('/login');
  }


  toggleSubMenu() {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  }

  youruser():void{
    this.router.navigateByUrl('/user/infor');
  }

  yourshopmanegar():void{
    this.router.navigateByUrl('/storee/infor');
  }




  search(term:string):void{
    if(term)
    {
      this.router.navigateByUrl('/search/'+term);
    }
  }

  loadSL_Shop() // Đếm số thông báo về đơn hàng cho CỬA HÀNG
  {
    this.orderService.getOrderUnconfirm(this.store._id).subscribe((store) => {
    
      this.countInfor=store.length;
    });
  }

  get isAuth(){
    return this.user.TaiKhoan;
  }
}
