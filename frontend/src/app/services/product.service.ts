import { HttpClient } from '@angular/common/http';


import { Observable, catchError, tap, throwError } from 'rxjs';
import { PRODUCT_ALL_BY_NAME_GET_URL, PRODUCT_ALL_GET_URL, PRODUCT_BEST_SELLER_BY_ID_STORE_URL, PRODUCT_DELETE_BY_ID_URL, PRODUCT_GET_BY_ID_MENU_URL, PRODUCT_GET_BY_ID_STORE_URL, PRODUCT_GET_BY_ID_URL, PRODUCT_NEW_ADD_URL, PRODUCT_UPDATE_BY_ID_URL, PRODUCT_BY_ID_CHITIET, PRODUCT_BY_JSON_PRODUCT_DETAIL, EXCEL_EXPORT_URL, PRODUCT_TOP_25, PRODUCT_LIST_NEW, PRODUCT_ALL_PRODUCT_URL} from '../shared/constants/urls';
import { Product } from '../shared/models/product';
import { Injectable } from '@angular/core';
import { IProducUpdate, IProductAdd } from '../shared/interfaces/IProduct';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient,private toastrService:ToastrService, private router:Router) { }

  getAllProduct():Observable<any[]>{
    return this.http.get<any[]>(PRODUCT_ALL_GET_URL);
  } // lấy tất cả nhưng có sự random. hình như chỉ lấy 9 sản phẩm thôi nhé 


  getALLProduct_2():Observable<any[]>{
    return this.http.get<any[]>(PRODUCT_ALL_PRODUCT_URL)
  }

  getAllProductbyName(name: string): Observable<any[]> {
    const url = `${PRODUCT_ALL_BY_NAME_GET_URL}/${name}`;
    return this.http.get<any[]>(url);
  }
  

  getAllProductbyidStore(name: string): Observable<Product[]> {
    const url = `${PRODUCT_GET_BY_ID_STORE_URL}/${name}`;
    return this.http.get<Product[]>(url);
  }

  getProductbyIdMenu(idMenu: string): Observable<Product[]> {
    const url = `${PRODUCT_GET_BY_ID_MENU_URL}/${idMenu}`;
    return this.http.get<Product[]>(url);
  }
  
  getProductBestSellerbyIDStore (name:string): Observable<Product[]> {
    const url = `${PRODUCT_BEST_SELLER_BY_ID_STORE_URL}/${name}`;
    return this.http.get<Product[]>(url);
  }

  getProductByID(chitietsanpham: string): Observable<any[]> {
    const url = `${PRODUCT_BY_ID_CHITIET}/${chitietsanpham}`;
    return this.http.get<any[]>(url);
  }
  

  getProductbyIdProduct (name:string): Observable<Product[]> {
    const url = `${PRODUCT_GET_BY_ID_URL}/${name}`;
    return this.http.get<Product[]>(url);
  }

  getExcelExport(name: string): Observable<Blob> {
    const url = `${EXCEL_EXPORT_URL}/${name}`;
    
    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap((blob: Blob) => {
       
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'excel-'+name+'.xlsx';
        link.click();
        window.URL.revokeObjectURL(blobUrl); 
      
        this.toastrService.success('Tải xuống thành công', 'Success');
      }),
      catchError((error: any) => {
        // Hiển thị thông báo thất bại
        this.toastrService.error(error.error, 'Failed');
        return throwError(error);
      })
    );
  }


  

  postNewProduct (product:IProductAdd): Observable<Product> {
    
    return this.http.post<Product>(PRODUCT_NEW_ADD_URL, product)
    .pipe(
      tap((response: any) => {
        this.toastrService.success(
          `Thêm sản phẩm mới thành công`,
          'Add Successful'
        );
        this.router.navigateByUrl('/storee/product');
      }),
      catchError((error: any) => {
        this.toastrService.error(error.error, 'Add failed');
     
        return throwError(error);
      })
    );
  }

  

  updateProduct (product:IProducUpdate): Observable<Product> {
    
    return this.http.patch<Product>(PRODUCT_UPDATE_BY_ID_URL, product)
    .pipe(
      tap((response: any) => {
        this.toastrService.success(
          `Cập nhật sản phẩm mới thành công`,
          'Add Successful'
        );

        this.router.navigateByUrl('/storee/product');
      }),
      catchError((error: any) => {
        this.toastrService.error(error.error, 'Cập nhật thất bại');
     
        return throwError(error);
      })
    );
  }



  deleteProduct(idProduct: string): Observable<Product> {
    const url = `${PRODUCT_DELETE_BY_ID_URL}/${idProduct}`; 
  
    return this.http.delete<Product>(url)
      .pipe(
        tap((response: any) => {
          this.toastrService.success(
            'Xóa sản phẩm thành công',
            'Thành công'
          );
          this.router.navigateByUrl('/storee/product');
        }),
        catchError((error: any) => {
          this.toastrService.error(error.error, 'Xóa thất bại');
          return throwError(error);
        })
      );
  }
  
  getTopProducts():Observable<any[]>{
    const url = `${PRODUCT_TOP_25}`;
    return this.http.get<any[]>(url);
  }

  getRecentProduct(): Observable<Product[]>{
    const url = `${PRODUCT_LIST_NEW}`;
    return this.http.get<Product[]>(url);
  }


}
