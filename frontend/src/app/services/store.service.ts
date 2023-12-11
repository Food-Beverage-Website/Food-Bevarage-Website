import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Store } from '../shared/models/store';
import {  STORE_BEST_SELLING_GET_URL, STORE_GET_BY_ID_URL, STORE_LOGIN_URL, STORE_NEW_URL, STORE_SEARCH_BY_NAME_URL } from '../shared/constants/urls';
import { IStoreLogin, IStoreNew } from '../shared/interfaces/IStoreLogin';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const store_key='Store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private storeSubject = new BehaviorSubject<Store>(this.getStoreFromLocalStorage());
  public storeObservable:Observable<Store>;

  constructor(private http:HttpClient, private toastrService:ToastrService, private router:Router) { 
    this.storeObservable =this.storeSubject.asObservable();
  }

  getBestSelling():Observable<Store[]>{
    return this.http.get<Store[]>( STORE_BEST_SELLING_GET_URL);
  }


  getStorebyID(IdStore: string):Observable<Store>{
    const url = `${STORE_GET_BY_ID_URL}/${IdStore}`;
    return this.http.get<Store>(url);
  }

  getStorebyNameSearch(namesearch: string):Observable<Store[]>{
   
    const url = `${STORE_SEARCH_BY_NAME_URL}/${namesearch}`;
    return this.http.get<Store[]>(url);
  }


  addNewStore(storeInfor:IStoreNew ): Observable<Store> {
    return this.http.post<Store>(STORE_NEW_URL, storeInfor)
      .pipe(
        tap((response: any) => {
          this.toastrService.success(
            `Đăng ký tài khoản cửa hàng thành công`,
            'Add Successful'
          );
          this.router.navigateByUrl('/login');
        }),
        catchError((error: any) => {
          this.toastrService.error(error.error, 'Add failed');
       
          return throwError(error);
        })
      );
  }



  login(storeLogin: IStoreLogin): Observable<Store> {
    return this.http.post<Store>(STORE_LOGIN_URL, storeLogin).pipe(
      tap({
        next: (store) => {
          this.setStoreToLocalStorage(store);
          this.storeSubject.next(store);
          this.toastrService.success(
            `Welcome to Foody Store ${store.TenCuaHang}!`,
            'Login Successful'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,'Login failed');
        },
      })
    );
  }

  logout()
  {
    this.storeSubject.next(new Store());
    localStorage.removeItem(store_key);
   
  }


  private setStoreToLocalStorage (store:Store)
  {
    localStorage.setItem(store_key,JSON.stringify(store))
  }
  
  private getStoreFromLocalStorage():Store
  {
    const storeJson = localStorage.getItem(store_key)
    if(storeJson) return JSON.parse(storeJson) as Store;
    return new Store();
  }

}
