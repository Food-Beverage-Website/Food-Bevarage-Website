import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent  implements OnInit{
  loginbuyerForm!: FormGroup;
  loginshopForm!:FormGroup;
  isSubmitted =false;
  returnUrl='';
  constructor(private formBuider: FormBuilder, private userSevice:UserService,
     private activatedRoute:ActivatedRoute, private router:Router) {
    
  }
  ngOnInit(): void {
   this.loginbuyerForm =this.formBuider.group({
    account:['',[Validators.required]],
    password:['',[Validators.required]]
   })

   this.returnUrl=this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc(){
    return this.loginbuyerForm.controls;
  }

  submit()
  {
    this.isSubmitted=true;
    if(this.loginbuyerForm.invalid) return;

    alert(`Account:${this.fc.account.value},
        Password:${this.fc.password.value}
    `)

    this.userSevice.login({account:this.fc.account.value,password:this.fc.password.value}).subscribe(()=>{
        this.router.navigateByUrl(this.returnUrl);
    })
  }

  submit_sh()
  {
    this.isSubmitted=true;
    if(this.loginbuyerForm.invalid) return;

    alert(`Account:${this.fc.account_sh.value},
        Password:${this.fc.password_sh.value}
    `)

    this.userSevice.login({account:this.fc.account.value,password:this.fc.password.value}).subscribe(()=>{
        this.router.navigateByUrl(this.returnUrl);
    })
  }

  active = 1;

  // Các hàm và logic khác của component
}