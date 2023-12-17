import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PAYMENT_GET_URL } from '../shared/constants/urls';
import { Payment } from '../shared/models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

    constructor(private http:HttpClient) { }

    getAllPayment():Observable<Payment[]>{
        return this.http.get<Payment[]>(PAYMENT_GET_URL);
      }
}