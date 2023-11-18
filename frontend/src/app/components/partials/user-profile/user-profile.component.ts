import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user!:User;
  constructor(private router:Router, private userService:UserService){
    userService.userObservable.subscribe((newUser)=>{
      this.user= newUser;
    })
  }
}
