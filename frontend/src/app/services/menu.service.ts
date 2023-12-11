import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { MENU_DELETE_NAME_URL, MENU_GET_BY_ID_STORE_URL, MENU_PATCH_URL, MENU_UPDATE_NAME_URL } from '../shared/constants/urls';
import { IMenuChange,IMenuDelete,IMenuUpdate } from '../shared/interfaces/IStoreLogin';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http:HttpClient,
    private toastrService:ToastrService
    
    ) { }

  getMenubyIDStore(IdStore:string):Observable<any[]>{
   
    const url = `${MENU_GET_BY_ID_STORE_URL}/${IdStore}`;
    return this.http.get<any[]>(url);

  }

  

  updateNameMenu(IMenuUpdate:IMenuUpdate):Observable<any[]>{
    return this.http.put<any>(MENU_UPDATE_NAME_URL, IMenuUpdate)
    .pipe(
      tap((response: any) => {
        this.toastrService.success(
          `Cập nhật mới thành công`,
          'Add Successful'
        );
        
      }),
      catchError((error: any) => {
        this.toastrService.error("Cập nhật thất bại", 'Add failed');
     
        return throwError(error);
      })
    );
    }


    deleteNameMenu(IMenuDelte:IMenuDelete):Observable<any[]>{
      return this.http.post<any>(MENU_DELETE_NAME_URL, IMenuDelte)
      .pipe(
        tap((response: any) => {
          this.toastrService.success(
            `Xóa phân loại thành công`,
            'Add Successful'
          );
          
        }),
        catchError((error: any) => {
          this.toastrService.error("Xóa thất bại", 'Add failed');
       
          return throwError(error);
        })
      );
      }
  

    

 patchMenu(IMenuChange:IMenuChange):Observable<any[]>{
  return this.http.patch<any>(MENU_PATCH_URL, IMenuChange)

  }
  
}
