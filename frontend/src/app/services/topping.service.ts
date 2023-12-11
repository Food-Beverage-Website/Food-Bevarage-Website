import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Topping } from '../shared/models/topping';
import { TOPPING_DELETE_TOPPING_BY_ID_URL, TOPPING_GET_ALL_BY_ID_STORE_URL, TOPPING_GET_TOPPING_BY_ID_URL, TOPPING_POST_ADD_TOPPING_URL, TOPPING_UPDATE_TOPPING_BY_ID_URL } from '../shared/constants/urls';
import { IAddTopping, IDeleteTopping, IUpdateTopping } from '../shared/interfaces/ITopping';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class ToppingService {

  constructor(private http:HttpClient,private toastrService:ToastrService) { }

  getToppingbyIDStore(idStore:string):Observable<Topping[]>{
    const url = `${TOPPING_GET_ALL_BY_ID_STORE_URL}/${idStore}`;
    return this.http.get<Topping[]>(url);
  }


  postNewTopping (topping:IAddTopping): Observable<Topping> {
    
    return this.http.post<Topping>(TOPPING_POST_ADD_TOPPING_URL, topping)
    .pipe(
      tap((response: any) => {
        this.toastrService.success(
          `Thêm topping mới thành công`,
          'Add Successful'
        );
        
      }),
      catchError((error: any) => {
        this.toastrService.error(error.error, 'Add failed');
     
        return throwError(error);
      })
    );
  }


  patchUpdateTopping (topping:IUpdateTopping): Observable<Topping> {
    
    return this.http.put<Topping>(TOPPING_UPDATE_TOPPING_BY_ID_URL, topping)
    .pipe(
      tap((response: any) => {
        this.toastrService.success(
          `Cập nhật topping mới thành công`,
          'Add Successful'
        );
        
      }),
      catchError((error: any) => {
        this.toastrService.error(error.error, 'Update failed');
     
        return throwError(error);
      })
    );
  }

  deleteToppingID (topping:IDeleteTopping): Observable<Topping> {
  
    return this.http.post<Topping>(TOPPING_DELETE_TOPPING_BY_ID_URL,topping)
      .pipe(
        tap((response: any) => {
          this.toastrService.success(
            'Xóa topping thành công',
            'Thành công'
          );
        }),
        catchError((error: any) => {
          this.toastrService.error(error.error, 'Xóa thất bại');
          return throwError(error);
        })
      );
  }


  getToppingID (Topping:IDeleteTopping): Observable<any> {
    

    return this.http.post<any>(TOPPING_GET_TOPPING_BY_ID_URL,Topping)
   
  }



  
}
 