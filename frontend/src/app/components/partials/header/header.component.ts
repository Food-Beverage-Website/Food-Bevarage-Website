import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user!:User;
  constructor(private router:Router, private userService:UserService){
    userService.userObservable.subscribe((newUser)=>{
      this.user= newUser;
    })
  }

  ngOnInit(): void {

  }

  login():void{
    
      this.router.navigateByUrl('/login');
    
  }

  youruser():void{
    this.router.navigateByUrl('/user/infor');
  }

  cartUser():void{
    this.router.navigateByUrl('/cart_page');
  }


  search(term:string):void{
    if(term)
    {
      this.router.navigateByUrl('/search/'+term);
    }
  }

  get isAuth(){
    return this.user.TaiKhoan;
  }
}
