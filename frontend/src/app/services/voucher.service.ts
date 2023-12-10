import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GET_KHUYENMAI_THEO_CUAHANG_SANPHAM, GET_KHUYENMAI_THEO_GIOHANG} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private http:HttpClient) { }

  getPhanTramKhuyenMaiTheoCH_SP(productGioHangJson: any): Observable<any[]> {
    const url = `${GET_KHUYENMAI_THEO_CUAHANG_SANPHAM}`;
    return this.http.post<any>(url, { productGioHangJson });
  }

  getPhanTramKhuyenMaiTheoCioHang(idKhachHang: any): Observable<any> {
    const url = `${GET_KHUYENMAI_THEO_GIOHANG}`;
    return this.http.post<any>(url, { idKhachHang });
  }
}
