import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { Product } from 'src/app/shared/models/product';
import { Store } from 'src/app/shared/models/store';
import { Voucher } from 'src/app/shared/models/voucher';

@Component({
  selector: 'app-store-voucher',
  templateUrl: './store-voucher.component.html',
  styleUrls: ['./store-voucher.component.css']
})
export class StoreVoucherComponent implements OnInit {

  store!:Store;
  vouchers:Voucher[]=[]
  productsList:Product[]=[];
  selectedRow: number | null = null;
  selectedRow1: number=0;
  isRowVisible: boolean[] = Array(this.productsList.length).fill(false);
  idVoucher!:string;
  percent!:string;

  itemVoucher: Voucher | undefined;

  urllink:string="assets/Images/default.png"

  modifyVoucher = false;
  createVoucher=false;

  inputName!:string;
  inputvoucherStart!:string;
  inputvoucherEnd!:string;
  inputvoucherPercent!:string;
  inputvoucherImg!:string;

  constructor(
    private storeService: StoreService,
    private voucherService:VoucherService,
    private router:Router
    ){
    storeService.storeObservable.subscribe((newStore)=>{
      this.store=newStore
    })
  }
  ngOnInit(): void {

    this.loadVoucher()
    
    
  }

  handleRowClick(index: number): void {
    this.selectedRow = index;
    this.isRowVisible[index] = !this.isRowVisible[index];
  }

    loadVoucher()
    {
        this.voucherService.getVoucerbyID(this.store._id).subscribe((voucher)=>{
        this.vouchers=voucher
        this.percent=voucher[0].PhanTramGiam;
        this.loadProduct_fisrt()
      })
    } 


    loadProduct_fisrt()
    {
      this.voucherService.getAllProductVoucher(this.vouchers[0]._id).subscribe((product)=>{
        this.productsList=product

      })
    }


    showProductList(idVoucher:string, index: number,percent:string)
    {
      this.selectedRow1 = index;
      
      this.voucherService.getAllProductVoucher(idVoucher).subscribe((product)=>{
        this.productsList=product
       
      })

    }

    handleFileInput(event: any) {
      const url = "assets/Images/";
      const files = event.target.files;
      if (files && files.length > 0) {
        const hinh = files[0].name;
        this.urllink=url+hinh
        this.inputvoucherImg = hinh;
      }
    }

    calPercent(price:number):number{
      const percent = parseFloat(this.percent.replace('%', ''));
      const discountedPrice = price - (price * (percent / 100));
      return discountedPrice;
    }


    click_modifyVoucher(idVoucher:string)
    {
      this.modifyVoucher = true;
      this.itemVoucher = this.vouchers.find(item => item._id === idVoucher);
    }

    creatVoucher(){
      this.voucherService.createVoucher({
        MaCH:this.store._id,
        TenKhuyenMai:this.inputName,
        NgayKetThuc:this.inputvoucherEnd,
        NgayBatDau:this.inputvoucherStart,
        PhanTramGiam:this.inputvoucherPercent,
        Hinh:this.inputvoucherImg
      }).subscribe((voucher)=>{
        window.location.reload();
      })

    }


    close_modify(){
      this.modifyVoucher = false;
      this.router.navigateByUrl('/storee/infor');
      this.router.navigateByUrl('/storee/voucher');
    }

    close_createVoucher(){
      this.createVoucher = false;
    }

    click_createVoucher()
    {
      this.createVoucher = true;

    }





}
