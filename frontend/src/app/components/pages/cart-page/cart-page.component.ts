import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { retry } from 'rxjs';
import { VoucherService } from 'src/app/services/voucher.service';



@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cart_products: any;
  user!: User;
  danhsachKhuyenMai: any;

  constructor(private voucherService: VoucherService, private toastr: ToastrService, private productService: ProductService, private activatedRoute: ActivatedRoute, private userService: UserService) {
    this.activatedRoute.params.subscribe((params) => {

      userService.userObservable.subscribe((newUser) => {
        this.user = newUser;
      });

      if (this.user._id) {
        this.voucherService.getPhanTramKhuyenMaiTheoCioHang(this.user._id).subscribe((danhsachKhuyenMai) => {
          this.danhsachKhuyenMai = danhsachKhuyenMai;
          console.log(this.danhsachKhuyenMai);

        });
        

        this.userService.getCartProDuct(this.user._id).subscribe((cart_products) => {
          this.cart_products = cart_products;
          console.log(cart_products);
        });
      }


    });
  }

  tenCuaHang: string = "";
  selectedSanPhams: User[] = [];
  totalSizeLy: number = 0;
  totalTopping: number = 0;
  totalThanhTien: number = 0;
  soluongLy: number = 0;
  soluongTopping: number = 0;

  timKhuyenMai(item: any): any {
    if (!this.danhsachKhuyenMai || this.danhsachKhuyenMai.length === 0) {
      return 0; // Danh sách khuyến mãi không tồn tại hoặc rỗng
    }
  
    for (const it of this.danhsachKhuyenMai) {
      // Kiểm tra xem khuyến mãi có MaCH và SanPhams thích hợp hay không
      for(let khuyenMai of it)
      {
        if (
          khuyenMai.MaCH === item.MaSP.MaCH._id &&
          khuyenMai.SanPhams.some((sanPham: any) => sanPham.idsp === item.MaSP._id)
        ) {
          let phantramNumber = parseFloat(khuyenMai.PhanTramGiam);
  
          return phantramNumber; // Trả về khuyến mãi nếu thấy
        }
      }
      
    }
  
    return 0; // Trả về null nếu không tìm thấy khuyến mãi
  }
  
  
  tinhGIaKhuyenMai_SanPham(gia: number, phantram: number)
  {
    let tien = (gia / 100) * (100 - phantram);
    return tien;
  }



  mucCuaHang(setCH: string) {
    this.tenCuaHang = setCH;

  }

  isCollapsed: { [key: string]: boolean } = {};

  toggleCollapse(item: any): void {
    const key = item.MaSP._id + item.DonGiaSizeLy.Size;

    // Kiểm tra xem khóa đã tồn tại trong isCollapsed chưa
    if (this.isCollapsed[key] === undefined) {
      // Nếu chưa tồn tại, thiết lập giá trị là true
      this.isCollapsed[key] = true;
    } else {
      // Nếu đã tồn tại, chuyển đổi giá trị
      this.isCollapsed[key] = !this.isCollapsed[key];
    }
  }

  isSelectedCollapse(item: any) {
    const key = item.MaSP._id + item.DonGiaSizeLy.Size;

    // Sử dụng giá trị từ isSelectedCollapseArray(item) để thiết lập giá trị của isCollapsed
    this.isCollapsed[key] = true;

  }


  truncateName(tentopping: string, maxLength: number): string {
    if (tentopping.length > maxLength) {
      return tentopping.substring(0, maxLength) + '...';
    } else {
      return tentopping;
    }
  }

  toggleSelectionSanPham(item: any, event: any): void {
    const isChecked = event.target.checked;

    if (isChecked) {
      if (this.selectedSanPhams.length === 0) {
        // Nếu mảng selectedSanPhams rỗng, tạo một đối tượng mới và thêm vào GioHang
        const newUser = new User();
        newUser._id = this.user._id;
        newUser.GioHang.push(item);
        this.selectedSanPhams.push(newUser);
        this.calculateTotals();
      }
      else {
        const index = this.isItemSelected(item);

        if (index === -1) {
          this.selectedSanPhams[0].GioHang.push(item);
        }
        this.calculateTotals();
      }

      // Thêm sản phẩm vào giỏ hàng

    } else {
      // Xóa sản phẩm khỏi giỏ hàng
      const index = this.isItemSelected(item);

      if (index !== -1) {
        this.selectedSanPhams[0].GioHang.splice(index, 1);
      }
      this.calculateTotals();

    }
  }



  isItemSelected(item: any): number {
    // Kiểm tra xem mục có trong mảng selectedSanPhams không
    const index = this.selectedSanPhams[0].GioHang.findIndex(
      selectedItem => selectedItem.MaSP === item.MaSP && selectedItem.DonGiaSizeLy.Size === item.DonGiaSizeLy.Size
    );
    return index;
  }

  isItemGioHang(item: any): number {
    // Kiểm tra xem GioHang có được định nghĩa trong mảng đầu tiên không
    if (this.cart_products != undefined) {
      // Kiểm tra xem mục có trong GioHang không
      const index = this.cart_products.GioHang.findIndex(
        (selectedItem: any) =>
          selectedItem.MaSP._id == item.MaSP._id &&
          selectedItem.DonGiaSizeLy.Size == item.DonGiaSizeLy.Size
      );

      return index;
    }

    // Nếu không có GioHang, trả về -1 hoặc giá trị tùy chọn khác thích hợp
    return -1;
  }


  calculateTotals() {
    if (this.selectedSanPhams.length == 0) {
      return;
    }
    try {
      // Reset các tổng về 0 trước khi tính toán

      // Kiểm tra xem this.selectedSanPhams có phải là mảng và có ít nhất một phần tử hay không
      const GioHang = this.selectedSanPhams[0].GioHang; // Lấy người dùng đầu tiên trong mảng

      if (GioHang.length != 0) {
        let sly = 0;
        let gialy = 0;
        let sltopping = 0;
        let giatopping = 0;
        let tien = 0;

        for (const item of GioHang) {
          // Tính tổng DongiaSizeLy
          let phantramKM = this.timKhuyenMai(item);
          if(phantramKM != 0)
          {
            gialy = this.tinhGIaKhuyenMai_SanPham(item.DonGiaSizeLy.Dongia, phantramKM) * item.DonGiaSizeLy.SL;
          }
          else
          {
            gialy += item.DonGiaSizeLy.Dongia * item.DonGiaSizeLy.SL;

          }
          sly += item.DonGiaSizeLy.SL;

          // Tính tổng DongiaTopping
          for (const topping of item.DongiaToppings) {
            // Kiểm tra kiểu trước khi thực hiện phép cộng
            giatopping += topping.giatopping * topping.soluongtopping;
            sltopping += topping.soluongtopping;
          }
          tien += item.ThanhTien;

          // Tính tổng ThanhTien
          this.totalThanhTien = tien;
          this.soluongLy = sly;
          this.totalSizeLy = gialy;
          this.totalTopping = giatopping;
          this.soluongTopping = sltopping

          this.calculateSLLy();
          this.calculateGiaSizeLy();
          this.calculateSLTopping();
          this.calculateTotalGiaTopping();
        }
      }
      else {
        this.totalThanhTien = 0;
        this.soluongLy = 0;
        this.totalSizeLy = 0;
        this.totalTopping = 0;
        this.soluongTopping = 0

        this.calculateSLLy();
        this.calculateGiaSizeLy();
        this.calculateSLTopping();
        this.calculateTotalGiaTopping();
      }



      // Di chuyển lệnh return ra khỏi vòng lặp
      return this.totalThanhTien;
    } catch (error) {
      console.error('Đã xảy ra lỗi trong quá trình tính toán:', error);
      return 0;
      // Xử lý lỗi tùy thuộc vào yêu cầu của bạn
    }
  }

  calculateSLLy() {
    const num = this.soluongLy;
    return num;
  }

  calculateGiaSizeLy() {
    const num = this.totalSizeLy;
    return num;

  }

  calculateSLTopping() {
    const num = this.soluongTopping;
    return num;

  }
  calculateTotalGiaTopping() {
    const num = this.totalTopping;
    return num;

  }


  toggleSelectionCuaHang(cuaHangId: string, event: any): void {
    const isChecked = event.target.checked;

    // Tìm tất cả sản phẩm thuộc cửa hàng
    const productsInCuaHang = this.cart_products.GioHang.filter((item: any) => item.MaSP.MaCH._id === cuaHangId);

    // Duyệt qua sản phẩm và thiết lập checkbox của chúng
    productsInCuaHang.forEach((product: any) => {
      const productCheckboxId = product.MaSP.MaCH._id + '||' + product.MaSP._id + product.DonGiaSizeLy.Size;
      const productCheckbox = document.getElementById(productCheckboxId) as HTMLInputElement;

      if (productCheckbox) {
        productCheckbox.checked = isChecked;
        this.toggleSelectionSanPham(product, { target: { checked: isChecked } });
      }
    });
  }

  toggleSelectionCTatCa(event: any) {
    const isChecked = event.target.checked;

    const productsInCuaHang = this.cart_products.GioHang;

    // Duyệt qua sản phẩm và thiết lập checkbox của chúng
    productsInCuaHang.forEach((product: any) => {
      const productCheckboxId = product.MaSP.MaCH._id;
      const productCheckbox = document.getElementById(productCheckboxId) as HTMLInputElement;

      if (productCheckbox) {
        productCheckbox.checked = isChecked;
        this.toggleSelectionCuaHang(productCheckboxId, { target: { checked: isChecked } });
      }
    });
  }

  convertToJsonSanPhamGioHangChon(users: any) {
    users.idKhachHang = this.user._id;
    return users;
  }


  xoa1SanPhamGioHang(item: any) {
    if (this.selectedSanPhams.length == 0) {
      const indexGioHang = this.isItemGioHang(item);

      if (indexGioHang !== -1) {
        console.log("Xóa tt");

        this.cart_products.GioHang.splice(indexGioHang, 1);

        this.truyenXoaProductGioHangJson(item);
      }
      console.log(this.cart_products);
    }
    else {
      // Xóa sản phẩm khỏi giỏ hàng 
      const index = this.isItemSelected(item);

      if (index !== -1) {
        this.selectedSanPhams[0].GioHang.splice(index, 1);
      }
      const indexGioHang = this.isItemGioHang(item);

      if (indexGioHang !== -1) {
        this.cart_products.GioHang.splice(indexGioHang, 1);
        this.truyenXoaProductGioHangJson(item);

      }

      console.log("Xóa tt2");
      this.calculateTotals();
    }
  }


  truyenXoaProductGioHangJson(item: any) {
    if (this.user._id) {
      console.log(this.convertToJsonSanPhamGioHangChon(item));
      this.userService.dete1ProductGioHangJson(this.convertToJsonSanPhamGioHangChon(item)).subscribe(
        (response) => {
          console.log('Xóa thành công:', response);
          // Xử lý dữ liệu nhận được từ server ở đây
          this.toastr.info('Đã xóa sản phẩm: ' + item.MaSP.TenSP + '<br>Size: ' + item.DonGiaSizeLy.Size, 'Thông báo!', { enableHtml: true });

        },
        (error) => {
          this.toastr.error('Lỗi xóa!', 'Thông báo lỗi!');
          console.error('Error receiving product SanPham GioHang JSON:', error);
          // Xử lý lỗi ở đây
        }
      );
    }
    else {
      this.toastr.error('Bạn chưa đăng nhập. Xin vui lòng đăng nhập và thực hiện lại!', 'Thông báo lỗi!');

    }
  }



  thayDoiSoLuong(item: any, event: any) {
    const Soluong = parseInt(event.target.value, 10);
    item.DonGiaSizeLy.SL = Soluong;

    if (this.selectedSanPhams.length == 0) {
      const indexGioHang = this.isItemGioHang(item);


      if (indexGioHang !== -1) {

        this.cart_products.GioHang[indexGioHang].DonGiaSizeLy.SL = Soluong;
        this.truyenSuaProductGioHangJson(this.cart_products.GioHang[indexGioHang]);

      }
    }
    else {
      // Xóa sản phẩm khỏi giỏ hàng 
      const index = this.isItemSelected(item);

      if (index !== -1) {
        this.selectedSanPhams[0].GioHang[index].DonGiaSizeLy.SL = Soluong;
      }
      const indexGioHang = this.isItemGioHang(item);

      if (indexGioHang !== -1) {
        this.cart_products.GioHang[indexGioHang].DonGiaSizeLy.SL = Soluong;
        this.truyenSuaProductGioHangJson(this.cart_products.GioHang[indexGioHang]);


      }

      this.calculateTotals();
    }
  }



  giamSoLuongSanPhamGioHang(item: any) {
    let soluong = item.DonGiaSizeLy.SL - 1;

    if (soluong <= 1) { // Kiểm tra giá trị số lượng mới
      soluong = 1;
    }
    const idNumber = item.DonGiaSizeLy.Size + '||' + item.MaSP._id;
    const productCheckbox = document.getElementById(idNumber) as HTMLInputElement;

    if (productCheckbox) {
      productCheckbox.value = parseInt(soluong.toString(), 10).toString(); // Sử dụng parseInt
      this.thayDoiSoLuong(item, { target: { value: soluong.toString() } });
    }
  }


  tangSoLuongSanPhamGioHang(item: any) {
    let soluong = item.DonGiaSizeLy.SL + 1;

    if (soluong >= 10) { // Kiểm tra giá trị số lượng mới
      soluong = 10;
    }

    const idNumber = item.DonGiaSizeLy.Size + '||' + item.MaSP._id;
    const productCheckbox = document.getElementById(idNumber) as HTMLInputElement;

    if (productCheckbox) {
      productCheckbox.value = parseInt(soluong.toString(), 10).toString(); // Sử dụng parseInt
      this.thayDoiSoLuong(item, { target: { value: soluong.toString() } });
    }
  }

  truyenSuaProductGioHangJson(item: any) {
    if (this.user._id) {
      console.log(this.convertToJsonSanPhamGioHangChon(item));
      this.userService.edit1ProductGioHangJson(this.convertToJsonSanPhamGioHangChon(item)).subscribe(
        (response) => {
          console.log('Sửa thành công:', response);
          // Xử lý dữ liệu nhận được từ server ở đây
          this.toastr.info('Đã sửa sản phẩm: ' + item.MaSP.TenSP + '<br>Size: ' + item.DonGiaSizeLy.Size + '<br>SL: ' + item.DonGiaSizeLy.SL, 'Thông báo!', { enableHtml: true });

        },
        (error) => {
          this.toastr.error('Lỗi xóa!', 'Thông báo lỗi!');
          console.error('Error receiving product SanPham GioHang JSON:', error);
          // Xử lý lỗi ở đây
        }
      );
    }
    else {
      this.toastr.error('Bạn chưa đăng nhập. Xin vui lòng đăng nhập và thực hiện lại!', 'Thông báo lỗi!');

    }
  }


  thayDoiSoLuongTopping(item: any, event: any, idTP: string) {
    const Soluong = parseInt(event.target.value, 10);

    item.idTopping = idTP;

    if (this.selectedSanPhams.length == 0) {
      const indexGioHang = this.isItemGioHang(item);

      if (indexGioHang !== -1) {
        for (let tp of this.cart_products.GioHang[indexGioHang].DongiaToppings) {
          if (tp._id == idTP) {
            tp.soluongtopping = Soluong;
            item.sltopping = Soluong;
            this.truyenSuaToppingGioHangJson(item);

          }
        }
      }
    }
    else {
      // Xóa sản phẩm khỏi giỏ hàng 
      const index = this.isItemSelected(item);
      item.sltopping = Soluong;

      if (index !== -1) {

        for (let tp of this.selectedSanPhams[0].GioHang[index].DongiaToppings) {
          if (tp._id == idTP) {
            tp.soluongtopping = Soluong;
          }
        }
      }
      const indexGioHang = this.isItemGioHang(item);

      if (indexGioHang !== -1) {
        for (let tp of this.cart_products.GioHang[indexGioHang].DongiaToppings) {
          if (tp._id == idTP) {
            tp.soluongtopping = Soluong;
            this.truyenSuaToppingGioHangJson(item);

          }
        }
      }

      this.calculateTotals();
    }
  }



  giamSoLuongSanPhamToppingGioHang(item: any, idTp: string, soluongTopping: number) {
    let soluong = soluongTopping - 1;

    if (soluong <= 1) { // Kiểm tra giá trị số lượng mới
      soluong = 1;
    }

    let idNumber = idTp + '||' + item.DonGiaSizeLy.Size + '||' + item.MaSP._id;
    let productCheckbox = document.getElementById(idNumber) as HTMLInputElement;

    if (productCheckbox) {
      productCheckbox.value = parseInt(soluong.toString(), 10).toString(); // Sử dụng parseInt
      this.thayDoiSoLuongTopping(item, { target: { value: soluong.toString() } }, idTp);
    }
  }


  tangSoLuongToppingSanPhamGioHang(item: any, idTp: string, soluongTopping: number) {
    let soluong = soluongTopping + 1;

    if (soluong >= 3) { // Kiểm tra giá trị số lượng mới
      soluong = 3;
    }

    let idNumber = idTp + '||' + item.DonGiaSizeLy.Size + '||' + item.MaSP._id;
    let productCheckbox = document.getElementById(idNumber) as HTMLInputElement;

    if (productCheckbox) {
      productCheckbox.value = parseInt(soluong.toString(), 10).toString(); // Sử dụng parseInt
      this.thayDoiSoLuongTopping(item, { target: { value: soluong.toString() } }, idTp);
    }
  }

  truyenSuaToppingGioHangJson(item: any) {
    if (this.user._id) {
      console.log(this.convertToJsonSanPhamGioHangChon(item));
      this.userService.edit1ToppingProductGioHangJson(this.convertToJsonSanPhamGioHangChon(item)).subscribe(
        (response) => {
          console.log('Sửa topping thành công:', response);
          // Xử lý dữ liệu nhận được từ server ở đây
          this.toastr.info('Đã sửa topping:');

        },
        (error) => {
          this.toastr.error('Lỗi sửa topping!', 'Thông báo lỗi!');
          console.error('Error receiving product SanPham GioHang JSON:', error);
          // Xử lý lỗi ở đây
        }
      );
    }
    else {
      this.toastr.error('Bạn chưa đăng nhập. Xin vui lòng đăng nhập và thực hiện lại!', 'Thông báo lỗi!');

    }
  }

  xoa1ToppingGioHang(item: any, idTP: string) {
    let dem = 0;
    item.idTopping = idTP;

    if (this.selectedSanPhams.length == 0) {
      const indexGioHang = this.isItemGioHang(item);

      if (indexGioHang !== -1) {
        for (let tp of this.cart_products.GioHang[indexGioHang].DongiaToppings) {
          if (tp._id == idTP) {
            break;                    
          }
          dem++;
        }
      }
      this.cart_products.GioHang[indexGioHang].DongiaToppings.splice(dem, 1);
      this.truyenXoaToppingGioHangJson(item);

    }
    else {
      // Xóa sản phẩm khỏi giỏ hàng 
      const index = this.isItemSelected(item);

      if (index !== -1) {
        for (let tp of this.selectedSanPhams[0].GioHang[index].DongiaToppings) {
          if (tp._id == idTP) {
            break;                    
          }
          dem++;
        }
        this.selectedSanPhams[0].GioHang[index].DongiaToppings.splice(dem, 1);
      }
      dem = 0;
      const indexGioHang = this.isItemGioHang(item);

      if (indexGioHang !== -1) {
        for (let tp of this.cart_products.GioHang[indexGioHang].DongiaToppings) {
          if (tp._id == idTP) {
            break;                    
          }
          dem++;
        }
      }
      this.cart_products.GioHang[indexGioHang].DongiaToppings.splice(dem, 1);
      this.truyenXoaToppingGioHangJson(item);

      this.calculateTotals();
    }
  }


  truyenXoaToppingGioHangJson(item: any) {
    if (this.user._id) {
      console.log(this.convertToJsonSanPhamGioHangChon(item));
      this.userService.dete1ToppingGioHangJson(this.convertToJsonSanPhamGioHangChon(item)).subscribe(
        (response) => {
          // Xử lý dữ liệu nhận được từ server ở đây
          this.toastr.info('Đã xóa topping');

        },
        (error) => {
          this.toastr.error('Lỗi xóa topping!', 'Thông báo lỗi!');
          console.error('Error receiving product SanPham GioHang JSON:', error);
          // Xử lý lỗi ở đây
        }
      );
    }
    else {
      this.toastr.error('Bạn chưa đăng nhập. Xin vui lòng đăng nhập và thực hiện lại!', 'Thông báo lỗi!');

    }
  }
}
