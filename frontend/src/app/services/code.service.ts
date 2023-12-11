import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Code } from '../shared/models/code';
import { CODE_CHECK_URL, CODE_SEND_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

    constructor(private http:HttpClient,private toastrService:ToastrService) { }

    sendMailCode (mail:string): Observable<Code> {
        const url = `${CODE_SEND_URL}/${mail}`;
        return this.http.get<Code>(url);
      
     }

     

     checkCode (code:string): Observable<Code> {
        const url = `${CODE_CHECK_URL}/${code}`;
        return this.http.get<Code>(url)
        .pipe(
            tap((response: any) => {
            
            }),
            catchError((error: any) => {
              this.toastrService.error(error.error, 'PassCode không đúng');
              return throwError(error);
            })
          );
     }

}