import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(private router:Router, private userService:UserService){
    userService.userObservable.subscribe((newUser)=>{
      
    })
  }


  logout():void{
    this.userService.logout();
    this.router.navigateByUrl('');
    
  }
}
