import { Component, ViewEncapsulation } from '@angular/core';
import { Route, Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/shared/models/store';

@Component({
  selector: 'app-store-management',
  templateUrl: './store-management.component.html',
  styleUrls: ['./store-management.component.css'],

})
export class StoreManagementComponent {

  store!:Store
  constructor(private storeService:StoreService, private router:Router)
  {
    storeService.storeObservable.subscribe((newStore)=>{
      this.store=newStore;
    })
  }

  show(){
    this.router.navigateByUrl('/store/'+this.store._id);
  }

  logout():void{
    this.storeService.logout();
    this.router.navigateByUrl('');
    
  }
}
