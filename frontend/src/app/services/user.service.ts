import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, DELETE_TOPPING_GIOHANG_BY_JSON_BUYER, EDIT_COUNT_TOPPING_GIOHANG_BY_JSON_BUYER, PRODUCT_BY_JSON_PRODUCT_DETAIL, USER_CART_PRODUCT, DELETE_PRODUCT_GIOHANG_BY_JSON_BUYER, EDIT_COUNT_PRODUCT_GIOHANG_BY_JSON_BUYER } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

const user_key='User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  
  constructor(private http:HttpClient, private toastrService:ToastrService) { 
    this.userObservable =this.userSubject.asObservable();

  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Foody ${user.TenKhachHang}!`,
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
    this.userSubject.next(new User());
    localStorage.removeItem(user_key);
   
  }


  private setUserToLocalStorage (user:User)
  {
    localStorage.setItem(user_key,JSON.stringify(user))
  }
  
  private getUserFromLocalStorage():User
  {
    const userJson = localStorage.getItem(user_key)
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
  getProductDetailJson(productJson: any): Observable<any> {
    const url = `${PRODUCT_BY_JSON_PRODUCT_DETAIL}`;
    return this.http.post<any>(url, { productJson });
  }

  getCartProDuct(idKhachHang: any): Observable<any> {
    const url = `${USER_CART_PRODUCT}`;
    return this.http.post<any>(url, { idKhachHang });
  }
  dete1ProductGioHangJson(productGioHangJson: any): Observable<any> {
    const url = `${DELETE_PRODUCT_GIOHANG_BY_JSON_BUYER}`;
    return this.http.post<any>(url, { productGioHangJson });
  }

  edit1ProductGioHangJson(productGioHangJson: any): Observable<any> {
    const url = `${EDIT_COUNT_PRODUCT_GIOHANG_BY_JSON_BUYER}`;
    return this.http.post<any>(url, { productGioHangJson });
  }

  edit1ToppingProductGioHangJson(productGioHangJson: any): Observable<any> {
    const url = `${EDIT_COUNT_TOPPING_GIOHANG_BY_JSON_BUYER}`;
    return this.http.post<any>(url, { productGioHangJson });
  }

  dete1ToppingGioHangJson(productGioHangJson: any): Observable<any> {
    const url = `${DELETE_TOPPING_GIOHANG_BY_JSON_BUYER}`;
    return this.http.post<any>(url, { productGioHangJson });
  }

}
