import { Component } from '@angular/core';
import { CodeService } from 'src/app/services/code.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  fullName: string = '';
  address: string = '';
  phone: string ='';
  email: string = '';


  storename_s: string="";
  owner_s: string="";
  phone_s: string="";
  address_s: string="";
  cccd_s: string="";
  taikhoan_s: string="";
  password_s: string="";
  email_s: string="";

  passcode_shoper!:string;
  passcode_buyer!:string;

  isVerify_buyer = false
  isVerify_shoper=false
  constructor(
    private codeService:CodeService,
    private buyerService:UserService,
    private storeService:StoreService
  ){

  }

  onSubmit() {
    // Khi nút submit được nhấn, bạn có thể sử dụng các biến đã liên kết để thực hiện các xử lý cần thiết
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    console.log('Full Name:', this.fullName);
    console.log('Address:', this.address);
    console.log('Phone:', this.phone);
    console.log('Email:', this.email);
    this.isVerify_buyer=true;

   
    this.codeService.sendMailCode(this.email).subscribe((code)=>{

    })
  }



  onSubmit_s(){
    this.isVerify_shoper=true;
    this.codeService.sendMailCode(this.email_s).subscribe((code)=>{

    })
  }






  close_Verify_buyer(){
    this.isVerify_buyer = false
  }

  close_Verify_shoper(){
    this.isVerify_shoper = false
  }

  check_verify_buyer(){

    this.codeService.checkCode(this.passcode_buyer).subscribe(
      (data) => {
        this.execute_register_buyer()
      },
      (error) => {
       
       
      }
    );}


    check_verify_shoper(){
      this.codeService.checkCode(this.passcode_shoper).subscribe(
        (data) => {
          this.execute_register_shopper()
        },
        (error) => {
         
         
        }
      );
    }

    execute_register_buyer()
    {
     this.buyerService.addNewUser({
      user: this.username,
      password:this.password,
      TenKhachHang:this.fullName,
      DiaChi:this.address,
      SDT:this.phone,
      Gmail:this.email
    }).subscribe((user)=>{

    })
    }


    execute_register_shopper()
    {
     this.storeService.addNewStore({
      user:this.taikhoan_s,
      password:this.password_s,
      TenCuaHang:this.storename_s,
      ChuSoHuu:this.owner_s,
      CCCD:this.cccd_s,
      DiaChi:this.address_s,
      Gmail:this.email_s,
      SDT:this.phone_s
    }).subscribe((store)=>{

    })
    }


}

document.addEventListener('DOMContentLoaded', function () {
  const loginFormLink = document.getElementById('account-form-link') as HTMLElement;
  const registerFormLink = document.getElementById('store-form-link') as HTMLElement;
  const loginForm = document.getElementById('account-form') as HTMLElement;
  const registerForm = document.getElementById('store-form') as HTMLElement;

  if (loginFormLink && registerFormLink && loginForm && registerForm) {
      loginFormLink.addEventListener('click', function (e) {
          loginForm.style.display = 'block';
          registerForm.style.display = 'none';
          registerFormLink.classList.remove('active');
          loginFormLink.classList.add('active');
          e.preventDefault();
      });

      registerFormLink.addEventListener('click', function (e) {
          registerForm.style.display = 'block';
          loginForm.style.display = 'none';
          loginFormLink.classList.remove('active');
          registerFormLink.classList.add('active');
          e.preventDefault();
      });
  }
});