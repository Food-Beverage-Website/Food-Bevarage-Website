import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-user-profile',
	
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
 })
export class UserProfileComponent {
  user!:User;
  tenNguoiNhan: string = ''; 
  diaChi:string ='';
  SDT: string = ''; 
  idDiaChi='';
  showAlert = false;
  constructor(private router:Router,private userService:UserService)
  {
    userService.userObservable.subscribe((newUser)=>{
      if (newUser) {
        this.userService.getBuyerbyID(newUser._id).subscribe((user) => {
          this.user = user;
        });
      }
  
    })

  
  }

  reload()
  {
    this.userService.userObservable.subscribe((newUser)=>{
      if (newUser) {
        this.userService.getBuyerbyID(newUser._id).subscribe((user) => {
          this.user = user;
        });
      }
  
    })
  }

  saveAddress()
  {
    alert(this.user._id + ' ' + this.tenNguoiNhan + ' ' + this.diaChi + ' ' + this.SDT);

    this.userService.addAddress({
      idKhachHang:this.user._id,
      TenNhanHang: this.tenNguoiNhan, 
      DiaChi:this.diaChi, 
      SDT:this.SDT }).subscribe(()=>{
        location.reload();
    })
  }



  deleteAddress(idaddress: string) {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này không?');
  
    if (isConfirmed) {
      this.userService.delAddress("652432de25ab6d9df1cb019f", idaddress).subscribe(() => {
       
        location.reload();
      });
    }
   
  }



  
  closeAlert() {
    this.showAlert = false;
  }



}
