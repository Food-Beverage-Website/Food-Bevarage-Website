import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PRODUCT_ALL_BY_NAME_GET_URL, PRODUCT_ALL_GET_URL, PRODUCT_BY_ID_CHITIET} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAllProduct():Observable<any[]>{
    return this.http.get<any[]>(PRODUCT_ALL_GET_URL);
  }

  getAllProductbyName(name: string): Observable<any[]> {
    const url = `${PRODUCT_ALL_BY_NAME_GET_URL}/${name}`;
    return this.http.get<any[]>(url);
  }

  getProductByID(chitietsanpham: string): Observable<any[]> {
    const url = `${PRODUCT_BY_ID_CHITIET}/${chitietsanpham}`;
    return this.http.get<any[]>(url);
  }

}
