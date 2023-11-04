import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TypeService } from 'src/app/services/type.service';
import { Type } from 'src/app/shared/models/type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  types :Type[]=[];

  constructor(private typeService:TypeService, activatedRouter: ActivatedRoute)
  {
    let typeObservable:Observable<Type[]>
    activatedRouter.params.subscribe((params)=>{
      typeObservable=typeService.getAll();

      typeObservable.subscribe ((serverType)=>{
        this.types=serverType;
      })
    })
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
}
