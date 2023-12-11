
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreService } from 'src/app/services/store.service';
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
     private activatedRoute:ActivatedRoute, private router:Router, private storeService: StoreService) {
    
  }
  ngOnInit(): void {

   this.loginbuyerForm =this.formBuider.group({
    account:['',[Validators.required]],
    password:['',[Validators.required]]
   })


   this.loginshopForm =this.formBuider.group({
    account_sh:['',[Validators.required]],
    password_sh:['',[Validators.required]]
   })

   this.returnUrl=this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc(){
    return this.loginbuyerForm.controls;
  }

  get fc_sh(){
    return this.loginshopForm.controls;
  }

  submit()
  {
    this.isSubmitted=true;
    if(this.loginbuyerForm.invalid) return;

    this.userSevice.login({account:this.fc.account.value,password:this.fc.password.value}).subscribe(()=>{
        this.router.navigateByUrl(this.returnUrl);
    })
  }

  submit_sh()
  {
    this.isSubmitted=true;
    if(this.loginshopForm.invalid) return;

   
    this.storeService.login({account:this.fc_sh.account_sh.value,password:this.fc_sh.password_sh.value}).subscribe(()=>{
      //this.router.navigateByUrl(this.returnUrl);
      this.router.navigateByUrl('/storee/infor');
  })
   
  }

  active = 1;

}