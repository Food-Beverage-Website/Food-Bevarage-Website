import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ORDER_GET_ALL_BY_ID_ORDER_URL, ORDER_GET_ALL_BY_ID_STORE_URL, ORDER_GET_UNCONFIRM_URL, ODER_GIOHANG, ODER_STATE_URL } from '../shared/constants/urls';
import { IStateOrder } from '../shared/interfaces/IStoreLogin';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
  })
  export class OrderService {

    constructor(private http:HttpClient, private toastrService:ToastrService) { }

    getOrderUnconfirm(name: string): Observable<any[]> {
        const url = `${ORDER_GET_UNCONFIRM_URL}/${name}`;
        return this.http.get<any[]>(url);
      }


     getAllOrderbyIdStore(name: string): Observable<any[]> {
        const url = `${ORDER_GET_ALL_BY_ID_STORE_URL}/${name}`;
        return this.http.get<any[]>(url);
     }

     getAllOrderbyIdOrder(name: string): Observable<any> {
      const url = `${ORDER_GET_ALL_BY_ID_ORDER_URL}/${name}`;
      return this.http.get<any>(url);
   }

   oder_GioHang(cartJson: any): Observable<any> {
    const url = `${ODER_GIOHANG}`;
    return this.http.post<any>(url, { cartJson });
  }

  updateOrder (state:IStateOrder): Observable<any> {
    
    return this.http.patch<any>( ODER_STATE_URL, state)
    .pipe(
      tap((response: any) => {
        this.toastrService.success(
          `Cập nhật đơn hàng thành công`,
          'Add Successful'
        );

        
      }),
      catchError((error: any) => {
        this.toastrService.error(error.error, 'Cập nhật thất bại');
     
        return throwError(error);
      })
    );
  }



 
  }