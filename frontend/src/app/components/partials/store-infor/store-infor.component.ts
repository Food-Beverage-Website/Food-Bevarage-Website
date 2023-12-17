import { Component } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/shared/models/store';

@Component({
  selector: 'app-store-infor',
  templateUrl: './store-infor.component.html',
  styleUrls: ['./store-infor.component.css']
})
export class StoreInforComponent {
  activeTab: string = 'tab1';

 

  storeJWT!:Store
  store!:Store

  inputShop!:string;
  inputOwner!:string;
  inputCCCD!:string;
  inputAddress!:string;
  inputPhone!:string;
  inputGmail!:string;
  inputOpen!:string;
  inputClose!:string
  inputImg!:string;


  urllink!:string

  constructor( private storeService:StoreService)
  {
    this.storeService.storeObservable.subscribe((newStore)=>{
      this.storeJWT=newStore;
      this.loadStore();
    })
  }

  loadStore(){
    this.storeService.getStorebyID(this.storeJWT._id).subscribe((item)=>{
      this.store=item
      this.inputShop=item.TenCuaHang
      this.inputOwner=item.ChuSoHuu
      this.inputCCCD=item.CCCD
      this.inputAddress=item.DiaChi
      this.inputPhone=item.SDT
      this.inputGmail=item.Gmail
      this.inputOpen=item.GioMoCua
      this.inputClose=item.GioDongCua
      this.inputImg=item.Hinh
      this.urllink='assets/Images/'+item.Hinh
    })
  }

  changeTab(tab: string): void {
    
    this.activeTab = tab;
  }

  handleFileInput(event: any) {
    const url="assets/Images/"
    const files = event.target.files;
    if (files && files.length > 0) {
      const hinh = files[0].name;
      this.inputImg=hinh;
      this.urllink = url+hinh;
      
    }
  }

  updateShop(){
   

  this.storeService.patchStore({
    _id:this.store._id,
    TenShop:this.inputShop,
    TenChu:this.inputOwner,
    CCCD:this.inputCCCD,
    DiaChi:this.inputAddress,
    SDT:this.inputPhone,
    clode:this.inputClose,
    open:this.inputOpen,
    hinh:this.inputImg
  }).subscribe((item)=>{
    this.loadStore()
  })

  }

}
