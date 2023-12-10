import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { VoucherService } from 'src/app/services/voucher.service';


@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  products: any;
  user!: User;
  danhsachKhuyenMai: any;

  constructor(private voucherService: VoucherService, private toastr: ToastrService, private productService: ProductService, private activatedRoute: ActivatedRoute, private userService: UserService) 
  {
    this.activatedRoute.params.subscribe((params) => {
      if (params.productId) {
        this.productService.getProductByID(params.productId).subscribe((products) => {
          this.products = products;  
          voucherService.getPhanTramKhuyenMaiTheoCH_SP(this.taoJsonPostGiaKhuyenMai(products)).subscribe((danhsachKhuyenMai) => {
            this.danhsachKhuyenMai = danhsachKhuyenMai;
          });
          this.getPhanTramKhuyenMai_SanPham();
        });
      }
    });
   
   


    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });    
  }



  nhanThongTinKhuyenMai(item: any): any
  {
    this.voucherService.getPhanTramKhuyenMaiTheoCH_SP(this.taoJsonPostGiaKhuyenMai(item)).subscribe((danhsachKhuyenMai) => {
      return danhsachKhuyenMai;
    });
  }

  taoJsonPostGiaKhuyenMai(item: any)
  {
    const productGioHangJson = [{
      MaCH:  item.productInfo.MaCH._id,
      MaSP:  item.productInfo._id
    }]
    return productGioHangJson;
  }


  PhanTramGiam: number = 0;

  getPhanTramKhuyenMai_SanPham() {
    if (this.products.danhsachKhuyenMai[0].length > 0) {
        let dsgiam = this.products.danhsachKhuyenMai[0];
        let phantramString = dsgiam[0].PhanTramGiam; //trả về kiểu string '20%',...
        
        // Loại bỏ ký tự % ở cuối chuỗi
        let phantramNumber = parseFloat(phantramString);

        // Kiểm tra xem phantramNumber có phải là một số hợp lệ không
        if (!isNaN(phantramNumber)) {
            this.PhanTramGiam = phantramNumber;
            return phantramNumber;
        } else {
            console.error('PhanTramGiam không phải là một số hợp lệ.');
            return 0;
        }
    }

    return 0;
}


  tinhGIaKhuyenMai_SanPham(gia: number, phantram: number)
  {
    let tien = (gia / 100) * (100 - phantram);
    return tien;
  }



  ngOnInit(): void {
  
  }


  selectedSizePrice: number = 0; // Biến lưu trữ giá của size được chọn
  selectedToppings: { idTopping: string, name: string, price: number, quantity: number }[] = [];
  selectedSoluongPrice: number = 1;
  tenSize: string = "";
  tenTopping: string = "";

  // Các hàm để cập nhật giá khi size hoặc topping được chọn
  selectSize(sizePrice: number, setTenSize: string) {
    this.selectedSizePrice = sizePrice;
    this.tenSize = setTenSize;

  }
  selectTopping(setIDTopping: string, toppingPrice: number, setTenTopping: string, quantity: number) {
    const existingToppingIndex = this.selectedToppings.findIndex(topping => topping.name === setTenTopping);

    if (existingToppingIndex !== -1) {
      // Topping already selected, update quantity or remove if quantity is 0
      if (quantity > 0) {
        this.selectedToppings[existingToppingIndex].quantity = quantity;
      } else {
        // Remove topping if quantity is 0
        this.selectedToppings.splice(existingToppingIndex, 1);
      }
    } else if (quantity > 0) {
      // Add new topping to the selected list with quantity
      this.selectedToppings.push({idTopping: setIDTopping, name: setTenTopping, price: toppingPrice, quantity: quantity });
    }
  }

  // Trong phần khai báo:





  isSelectedTopping(toppingName: string): boolean {
    return this.selectedToppings.some(topping => topping.name === toppingName);
  }


  selectSoluong(SoluongPrice: number) {
    this.selectedSoluongPrice = SoluongPrice;
  }

  showgiaSize() {
    return this.selectedSizePrice;
  }

  showTongGiaTopping() {
    const toppingsTotalPrice = this.selectedToppings.reduce((total, topping) => {
      return total + topping.price * topping.quantity;
    }, 0);
    return toppingsTotalPrice;
  }


  // Hàm tính tổng giá
  calculateTotalPrice() {
    const toppingsTotalPrice = this.selectedToppings.reduce((total, topping) => total + topping.price * topping.quantity, 0);
    return (this.selectedSizePrice * this.selectedSoluongPrice) + toppingsTotalPrice;
  }

  calculateTotalPrice_CoKhuyenMai() {
    let gia = this.tinhGIaKhuyenMai_SanPham(this.selectedSizePrice, this.getPhanTramKhuyenMai_SanPham())
    const toppingsTotalPrice = this.selectedToppings.reduce((total, topping) => total + topping.price * topping.quantity, 0);
    return (gia * this.selectedSoluongPrice) + toppingsTotalPrice;
  }

  createJsonFromProduct(): any {
    const toppingNames = this.selectedToppings.map(topping => {
      return {
        _id: topping.idTopping,
        tenTopping: topping.name,
        soluongtopping: topping.quantity,
        giatopping: topping.price
      };
    });
  
    const currentDateTime = new Date(); // Lấy thời gian hiện tại
  
    const productJson = {
      MaSP: {
        $oid: this.products.productInfo._id // Chắc chắn rằng bạn có MaSP từ product, có thể thay đổi key nếu cần thiết
      },
      ThoiGianThemGH: currentDateTime.toISOString(), // Thêm thời gian hiện tại ở định dạng chuỗi ISO
      DonGiaSizeLy: {
        SL: this.selectedSoluongPrice,
        Size: this.tenSize,
        Dongia: this.selectedSizePrice
      },
      DongiaToppings: toppingNames, // Thêm thông tin toppings,
      TongGiaSizeLy: this.selectedSizePrice * this.selectedSoluongPrice,
      TongGiaTopping: this.showTongGiaTopping(), // Sử dụng hàm tính tổng giá toppings
      ThanhTien: this.calculateTotalPrice(),
      GhiChu: "", // Bạn có thể thêm thông tin GhiChu từ product nếu có
      idUser: this.user._id,
    };
  
    return productJson;
  }
  

  // Trong file .ts của component
  formatPrice(gia: number): string {
    if (gia >= 1000) {
      return (gia / 1000).toFixed(0) + 'k';
    } else {
      return gia.toString();
    }
  }

  truncateName(tentopping: string, maxLength: number): string {
    if (tentopping.length > maxLength) {
      return tentopping.substring(0, maxLength) + '...';
    } else {
      return tentopping;
    }
  }

  hideRadioIcon: boolean = false; // Set it to true when you want to hide radio buttons

  // Trong thành phần của bạn
  getIconName(size: string): string {
    switch (size) {
      case 'S':
        return 'water_loss';
      case 'M':
        return 'water_medium';
      case 'L':
        return 'water_full';
      default:
        return 'takeout_dining';
    }
  }

  truyenDetailProductJson() {
    if (this.user._id) {
     if(this.tenSize != "")
     {
      console.log(this.createJsonFromProduct());
      this.userService.getProductDetailJson(this.createJsonFromProduct()).subscribe(
        (response) => {
          console.log('Product detail JSON received successfully:', response);
          // Xử lý dữ liệu nhận được từ server ở đây
          this.toastr.success('Đã thêm vào giỏ hàng!', 'Thông báo!');

        },
        (error) => {
          console.error('Error receiving product detail JSON:', error);
          // Xử lý lỗi ở đây
        }
      );
     }
     else{
      this.toastr.error('Bạn chưa chọn size ly!', 'Thông báo lỗi!');

     }
    }
    else {
      this.toastr.error('Bạn chưa đăng nhập. Xin vui lòng đăng nhập và thực hiện lại!', 'Thông báo lỗi!');

    }
  }
}
