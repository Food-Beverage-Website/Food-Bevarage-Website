import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from '../shared/models/type';
import { TYPE_GET_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Type[]>{
    return this.http.get<Type[]>(TYPE_GET_URL);
  }
}
