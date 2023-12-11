import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/product';
import { Store } from 'src/app/shared/models/store';
import { Type } from 'src/app/shared/models/type';

@Component({
  selector: 'app-store-modify-product',
  templateUrl: './store-modify-product.component.html',
  styleUrls: ['./store-modify-product.component.css']
})
export class StoreModifyProductComponent implements OnInit{

  @Output() dataToParent = new EventEmitter<string>();

  @Input() store!: Store;
  @Input() idProduct!:string;
  @Input() tieumucs:Type[]=[];
  @Input() from!:string;
  urllink!:string


  inputType!:string;
  inputProductName!:string;
  inputDescribed!:string;
  inputCategory!:string;
  inputState!:string;
  inputImg!:string;
  inputPrice: { Size: string, Gia: number }[] = [];

  product!:Product

  constructor(private productService:ProductService, private router:Router) {

  }
 
  ngOnInit(): void {
    this.loadInforProduct()
  }


  loadInforProduct(){
    const url="assets/Images/"
    this.productService.getProductbyIdProduct(this.idProduct).subscribe((product)=>{
      
      this.product=product[0];
      this.inputProductName=product[0].TenSP
      this.inputDescribed=product[0].MieuTa
      this.inputState=product[0].TinhTrang
      this.urllink=url+product[0].Hinh
      this.inputImg=product[0].Hinh;
      this.inputPrice.push(...product[0].DonGia)
      this.inputType=product[0].MaTieuMuc
      this.inputCategory=product[0].MaThucDon

    })
  }



  handleFileInput(event: any) {
    const url="assets/Images/"
    const files = event.target.files;
    if (files && files.length > 0) {
      const hinh = files[0].name;
      this.urllink=url+hinh;
      this.inputImg=hinh;
   
      
    }
  }

  addInput() {
    this.inputPrice.push({ Size: '', Gia: 0 });
  }

  removeItem(index: number): void {
    this.inputPrice.splice(index, 1);
  }

  checkText():boolean
  {
    if(!this.inputDescribed || !this.inputProductName )
    {
      return false;
    }
    
    for (const item of this.inputPrice) {
      if (!item.Gia || !item.Size) {
        return false;
      }
    }
    return true;
  }

  updateProduct(){
    if(this.checkText()==false)
    {
    
      alert("Vui lòng nhập dữ liệu đầy đủ")
    }
    else
    {
      this.productService.updateProduct({
        _id:this.product._id,
        TenSP:this.inputProductName,
        MieuTa:this.inputDescribed,
        DonGia:this.inputPrice,
        Hinh:this.inputImg,
        TinhTrang:this.inputState,
        MaTieuMuc:this.inputType,
        MaThucDon:this.inputCategory
      }).subscribe(()=>{
        
      })
     
        this.dataToParent.emit('false');
      this.router.navigateByUrl('/storee/infor');
    }
  }


 

  deleteProduct(){
    const confirmation = window.confirm('Bạn có chắc chắn muốn xóa?');

    if (confirmation) {
      
      this.productService.deleteProduct(this.product._id).subscribe(() => {
        
       
      })
      this.router.navigateByUrl('/storee/infor');
    } else {
     
    }
  }


}
