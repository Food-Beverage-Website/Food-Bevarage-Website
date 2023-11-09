import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../shared/models/store';
import { BEST_SELLING_STORE_GET_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http:HttpClient) { }

  getBestSelling():Observable<Store[]>{
    return this.http.get<Store[]>(BEST_SELLING_STORE_GET_URL);
  }
}
