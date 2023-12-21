
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';
import { Store } from 'src/app/shared/models/store';
import { User } from 'src/app/shared/models/user';
import { LoadingComponent } from '../loading/loading.component';
import { LoadingService } from 'src/app/services/loading.service';
import { DistanceService } from 'src/app/services/distance.service';
import { DistanceBuyerService } from 'src/app/services/session/distance_buyer';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent implements OnInit {

  user!:User;
  store!:Store;
  countInfor!:number;

  lat!:string;
  lon!:string;

  address:any;

  diachi!:string;


  isSubMenuVisible = false;
  constructor(private orderService:OrderService,
    private router:Router,
     private userService:UserService,
      private storeService:StoreService,
      private loadingService:LoadingService,
      private distanceService:DistanceService,
      private distanceBuyer:DistanceBuyerService,
 
      ){


  
    userService.userObservable.subscribe((newUser)=>{
      this.user= newUser;
    })

    storeService.storeObservable.subscribe((newStore)=>{
      this.store=newStore;
      this.loadSL_Shop();
    })

    this.loadMap()
  }

  ngOnInit(): void {
 
    this.loadMap()
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


  loadMap() {
    this.distanceService.getCurrentPosition().then(
      (position) => {
        this.distanceBuyer.currentLatitude = position.coords.latitude;
        this.distanceBuyer.currentLongitude = position.coords.longitude;
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;

        alert(this.lat +'/'+  this.lon )
  
        this.distanceService.getAddress(this.lat, this.lon).subscribe((item) => {
        
          this.diachi =  item.address.village || item.address.road ||item.address.quarter||item.address.suburb|| item.address.country  ;
          if(item.address.amenity)
          {
            this.diachi =item.address.amenity
          }else if(item.address.house_number && item.address.road  )
          {
            this.diachi =item.address.house_number +','+item.address.road 
          }
        });
      },
      (error) => {
        console.error('Error getting location', error);
      }
    );
  }

  loadAddressCurrent()
  {
   
   
  }
  tolistStores():void{
    this.router.navigateByUrl('/list-stores');
  }

  home(){
    this.router.navigateByUrl('/');
  }


  nearme(){
    this.router.navigateByUrl('/nearme');
  }
}


