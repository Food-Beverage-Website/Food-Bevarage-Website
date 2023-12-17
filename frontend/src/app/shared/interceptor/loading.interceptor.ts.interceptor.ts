import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
var pendingRequest=0;

@Injectable()
export class LoadingInterceptorTsInterceptor implements HttpInterceptor {

  constructor(private loadService:LoadingService){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   this.loadService.showLoading();
   
   pendingRequest =pendingRequest+1
    return next.handle(req).pipe(
      tap({
        next:(event)=>{
          if(event.type===HttpEventType.Response){
            this.handleHideLoadng();
          }

        },
        error:(_)=>{
          this.handleHideLoadng();
        }
      })
    );
  }

  handleHideLoadng()
  {
    pendingRequest =pendingRequest-1
    if(pendingRequest===0)
    {
      this.loadService.hideLoading();
    }
  }
}