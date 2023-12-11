import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Voucher } from '../shared/models/voucher';
import { VOUCHER_ADD_PRODUCT_URL, VOUCHER_CHANGE_APPLIED_PRODUCT_URL, VOUCHER_CREATE_URL, VOUCHER_DELETE_URL, VOUCHER_GET_ALL_BY_ID_STORE, VOUCHER_GET_ALL_PRODUCT_URL, VOUCHER_GET_ALL_URL, VOUCHER_GET_NONE_PRODUCT_URL, VOUCHER_UPDATE_URL,GET_KHUYENMAI_THEO_CUAHANG_SANPHAM, GET_KHUYENMAI_THEO_GIOHANG } from '../shared/constants/urls';
import { Product } from '../shared/models/product';
import { IVoucherChange,IVoucherUpdate,IVoucherCreate } from '../shared/interfaces/IVoucher';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
    constructor(
      private http:HttpClient,
      private toastrService:ToastrService,
      private router:Router
      ){

    }

    getVoucerbyID(idStore: string): Observable<Voucher[]> {
        const url = `${VOUCHER_GET_ALL_BY_ID_STORE}/${idStore}`;
        return this.http.get<Voucher[]>(url) 
    }

    getAllVoucher(): Observable<Voucher[]> {
      
      return this.http.get<Voucher[]>(VOUCHER_GET_ALL_URL) 
  }

  getAllProductVoucher(idVoucher: string): Observable<Product[]> {
    const url = `${VOUCHER_GET_ALL_PRODUCT_URL}/${idVoucher}`;
    return this.http.get<Product[]>(url) 
  }


getAllNoneProductVoucher(idVoucher: string): Observable<Product[]> {
  const url = `${VOUCHER_GET_NONE_PRODUCT_URL}/${idVoucher}`;
  return this.http.get<Product[]>(url) 
}

changeApplied(IVoucherChange:IVoucherChange): Observable<Voucher> {
  return this.http.post<Voucher>(VOUCHER_CHANGE_APPLIED_PRODUCT_URL, IVoucherChange)
}

addVoucherProduct(IVoucherChange:IVoucherChange): Observable<Voucher> {
  return this.http.post<Voucher>(VOUCHER_ADD_PRODUCT_URL, IVoucherChange)
}


updateVoucher(IVoucherUpdate:IVoucherUpdate): Observable<Voucher> {
  return this.http.patch<Voucher>(VOUCHER_UPDATE_URL, IVoucherUpdate)
  .pipe(
    tap((response: any) => {
      this.toastrService.success(
        `Cập nhật mới thành công`,
        'Add Successful'
      );
      this.router.navigateByUrl('/storee/voucher');
      
    }),
    catchError((error: any) => {
      this.toastrService.error(error.error, 'Add failed');
   
      return throwError(error);
    })
  );
}

createVoucher(IVoucherCreate:IVoucherCreate): Observable<Voucher> {
  return this.http.post<Voucher>(VOUCHER_CREATE_URL, IVoucherCreate)
  .pipe(
    tap((response: any) => {
      this.toastrService.success(
        `Thêm mới thành công`,
        'Add Successful'
      );
      this.router.navigateByUrl('/storee/voucher');
      
    }),
    catchError((error: any) => {
      this.toastrService.error(error.error, 'Add failed');
   
      return throwError(error);
    })
  );
}


deleteVoucher(id: string): Observable<Voucher> {
  const url = `${VOUCHER_DELETE_URL}/${id}`;
  return this.http.delete<Voucher>(url) .pipe(
    tap((response: any) => {
      this.toastrService.success(
        `Xóa khuyến mãi thành công`,
        'Add Successful'
      );
      this.router.navigateByUrl('/storee/voucher');
      
    }),
    catchError((error: any) => {
      this.toastrService.error(error.error, 'Add failed');
   
      return throwError(error);
    })
  );
}

//==============================================================
//Duy Minh
getPhanTramKhuyenMaiTheoCH_SP(productGioHangJson: any): Observable<any[]> {
  const url = `${GET_KHUYENMAI_THEO_CUAHANG_SANPHAM}`;
  return this.http.post<any>(url, { productGioHangJson });
}

getPhanTramKhuyenMaiTheoCioHang(idKhachHang: any): Observable<any> {
  const url = `${GET_KHUYENMAI_THEO_GIOHANG}`;
  return this.http.post<any>(url, { idKhachHang });
}
  
}

