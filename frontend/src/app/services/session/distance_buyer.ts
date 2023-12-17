import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DistanceBuyerService {

    private _currentLatitude: number = 0; 
    private _currentLongitude: number = 0; 

    

    get currentLatitude(): number {
      //  alert("long:"+this._currentLatitude)
        return this._currentLatitude;
      }
    
      set currentLatitude(value: number) {
        this._currentLatitude = value;
      }
    
      get currentLongitude(): number {
       // alert("long:"+this._currentLongitude)
        return this._currentLongitude;
      }
    
      set currentLongitude(value: number) {
        
        this._currentLongitude = value;
      }
}