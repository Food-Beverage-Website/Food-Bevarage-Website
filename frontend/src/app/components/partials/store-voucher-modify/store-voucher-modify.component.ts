import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoucherService } from 'src/app/services/voucher.service';
import { Product } from 'src/app/shared/models/product';
import { Voucher } from 'src/app/shared/models/voucher';

@Component({
  selector: 'app-store-voucher-modify',
  templateUrl: './store-voucher-modify.component.html',
  styleUrls: ['./store-voucher-modify.component.css']
})
export class StoreVoucherModifyComponent implements OnInit{

  @Input() voucher!:Voucher ;


  appliedVoucher:Product[]=[]
  noneApplyVoucher:Product[]=[]
  urllink:string="assets/Images/default.png"
  url:string ="assets/Images/"


  inputVoucherName!:string;
  inputVoucherStart!:string;
  inputVoucherEnd!:string;
  inputVoucerPercent!:string;
  inputVouherPicture!:string;

  selectedApppliedProducts: string[] = [];
  selectedNoneVoucherProducts: string[] = [];

  constructor(
    private voucherService:VoucherService,
    private router:Router
    
    ){

  }


  ngOnInit(): void {
  
    this.inputVoucherName=this.voucher?.TenKhuyenMai
    this.inputVoucherStart=this.voucher?.NgayBatDau
    this.inputVoucherEnd=this.voucher?.NgayKetThuc
    this.inputVoucerPercent=this.voucher?.PhanTramGiam
    this.inputVouherPicture=this.voucher?.Hinh
    this.urllink=this.url+this.voucher?.Hinh;


    this.loadAppliedProduct();
    this.loadNoneApplyProduct();
  
  }

  loadAppliedProduct(){
    this.voucherService.getAllProductVoucher(this.voucher?._id).subscribe((product)=>{
      this.appliedVoucher=product
    })
  }


  loadNoneApplyProduct(){
    this.voucherService.getAllNoneProductVoucher(this.voucher?._id).subscribe((product)=>{
      this.noneApplyVoucher=product
    })
  }

  calPercent(price:number):number{
  const percent = parseFloat(this.voucher.PhanTramGiam.replace('%', ''));
    const discountedPrice = price - (price * (percent / 100));
    return discountedPrice;
  }


  handleFileInput(event: any) {
    const url = "assets/Images/";
    const files = event.target.files;
    if (files && files.length > 0) {
      const hinh = files[0].name;
   
      this.urllink=url+hinh
      this.inputVouherPicture = hinh;
   
    }
  }

  onCheckboxChange_Applied(index: number) {
    const itemId = this.appliedVoucher[index]._id;
  
    
    const indexInArray = this.selectedApppliedProducts.indexOf(itemId);
    
    if (indexInArray === -1) {
     
      this.selectedApppliedProducts.push(itemId);
    } else {
     
      this.selectedApppliedProducts.splice(indexInArray, 1);
    }

  }


  onCheckboxChange_AddNew(index: number) {
    const itemId = this.noneApplyVoucher[index]._id;
  
    
    const indexInArray = this.selectedNoneVoucherProducts.indexOf(itemId);
    
    if (indexInArray === -1) {
     
      this.selectedNoneVoucherProducts.push(itemId);
    } else {
     
      this.selectedNoneVoucherProducts.splice(indexInArray, 1);
    }

  }

  save_table_1()
  {
    

    this.voucherService.changeApplied({idVoucher:this.voucher._id, listID:this.selectedApppliedProducts})
    .subscribe((voucher)=>{
      this.loadAppliedProduct();
      this.loadNoneApplyProduct();
    })
    this.selectedApppliedProducts=[]
  }

  save_table_2()
  {
    this.voucherService.addVoucherProduct({idVoucher:this.voucher._id, listID:this.selectedNoneVoucherProducts})
    .subscribe((voucher)=>{
      this.loadAppliedProduct();
      this.loadNoneApplyProduct();
    })

  this.selectedNoneVoucherProducts=[]
  }


  updateVoucher()
  {
    this.voucherService.updateVoucher({
      idVoucher:this.voucher._id,
      TenKhuyenMai:this.inputVoucherName,
      NgayBatDau:this.inputVoucherStart,
      NgayKetThuc:this.inputVoucherEnd,
      PhanTramGiam:this.inputVoucerPercent,
      Hinh:this.inputVouherPicture
    
    }).subscribe((voucher)=>{
      
    })
    
  }

  deleteVoucher(){
    this.voucherService.deleteVoucher(this.voucher._id).subscribe((voucher)=>{
      
    })
  }

}
