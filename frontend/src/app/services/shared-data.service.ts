import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Type } from '../shared/models/type';
import { Store } from '../shared/models/store';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  private dataSubject = new BehaviorSubject<{ arrayData: Type[], store: Store }>({ arrayData: [], store: {_id:'',CCCD:'',ChuSoHuu:'',DiaChi:'',GioDongCua:'',GioMoCua:'',MatKhau:'',SDT:'',TaiKhoan:'',TenCuaHang:'',ThucDons:[]} });
  private dataSubject1 = new BehaviorSubject<{idCategory:string, idStore:string}>({idCategory:'',idStore:''});
  public data$ = this.dataSubject.asObservable();
  public data1$ = this.dataSubject1.asObservable();

  type:Type[]=[]
  store!:Store;
  
  setDatatoAddProduct(arrayData: Type[],store:Store) {
   this.type=arrayData
   this.store=store
  }

  getDatatoAddProduct(){
    return {
      type: this.type,
      store: this.store
    };

  }

  setDatatoModifyCategory (idCategory:string,idStore:string){
    this.dataSubject1.next({idCategory,idStore} );
  }
}
