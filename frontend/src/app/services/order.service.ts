import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ORDER_GET_ALL_BY_ID_STORE_URL, ORDER_GET_UNCONFIRM_URL } from '../shared/constants/urls';

@Injectable({
    providedIn: 'root'
  })
  export class OrderService {

    constructor(private http:HttpClient) { }

    getOrderUnconfirm(name: string): Observable<any[]> {
        const url = `${ORDER_GET_UNCONFIRM_URL}/${name}`;
        return this.http.get<any[]>(url);
      }


     getAllOrderbyIdStore(name: string): Observable<any[]> {
        const url = `${ORDER_GET_ALL_BY_ID_STORE_URL}/${name}`;
        return this.http.get<any[]>(url);
     }

  }