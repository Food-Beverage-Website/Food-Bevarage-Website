import { Component, inject, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { retry } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-dathang-dialog',
  templateUrl: './dathang-dialog.component.html',
  styleUrls: ['./dathang-dialog.component.css'],
})
export class DathangDialogComponent {

  constructor(private oderService: OrderService, private toastr: ToastrService) { }
  modifyVoucher=true
  activeModal = inject(NgbActiveModal);

  @Input() thongtinUser!: any;
  @Input() name!: any;
  @Input() danhsachPhuongThucThanhToan: any;
  @Input() sotienthanhtoan: any;
  @Input() danhsachSPdathang: any;

  selectedDiaChi: string = "";
  selectedThanhToan: string = "";
  selectedGhiChu: string = "";

  setGhiChu(gc: string)
  {
    this.selectedGhiChu = gc;
  }

  setDiaChi(indexDiaChi: string) {
    this.selectedDiaChi = indexDiaChi;
  }

  setThanhToan(phuongthuc: string) {
    this.selectedThanhToan = phuongthuc;
  }

  taoJsonThanhToan() {
    if (this.danhsachSPdathang.length === undefined) {
      return 0;
    } else {

      const currentDateTime = new Date(); // Lấy thời gian hiện tại

      const cartJson = {
        NgayDat: currentDateTime.toISOString(),
        PhuongThucThanhToan: this.selectedThanhToan,
        TinhTrangDonHang: 'Chờ xác nhận',
        ChitietDonHang: this.danhsachSPdathang[0].GioHang.map((tt: any) => {
          return {
            KhachHang: this.danhsachSPdathang[0]._id,
            SanPham: tt.MaSP._id,
            SL: tt.DonGiaSizeLy.SL,
            KhuyenMai: tt.KhuyenMai,
            DonGiaKhuyenMai: tt.DonGiaKhuyenMai,
            DonGia: {
              Size: tt.DonGiaSizeLy.Size,
              Dongia: tt.DonGiaSizeLy.Dongia
            },
            Topping: tt.DongiaToppings.map((topping: any) => {
              return {
                MaTopping: topping._id,
                DonGia: topping.giatopping,
                SL: topping.soluongtopping
              };
            }),
            MaCH: tt.MaSP.MaCH._id,
            TongTien: tt.ThanhTien,
          };
        }).sort((a: any, b: any) => a.MaCH.localeCompare(b.MaCH)), // Sắp xếp theo MaCH
        DiachiGH: this.selectedDiaChi,
        GhiChu: this.selectedGhiChu,
      };

      console.log(cartJson);
      return cartJson;
    }
  }


  truyenJsonDatHang() {
    if (this.selectedDiaChi == "" && this.selectedThanhToan == "") {
      this.toastr.error("Hãy chọn địa chỉ nhận hàng và phương thức thanh toán")
      return;
    }
    else if (this.selectedDiaChi == "") {
      this.toastr.error("Hãy chọn địa chỉ nhận hàng", "Thông báo lõi")
      return;
    }
    else if (this.selectedThanhToan == "") {
      this.toastr.error("Hãy chọn phương thức thanh toán");
      return;
    }
    else {
      this.oderService.oder_GioHang(this.taoJsonThanhToan()).subscribe(
        (response) => {
          console.log('Đặt hàng thành công:', response);
          // Xử lý dữ liệu nhận được từ server ở đây
          this.toastr.success('Đãt hàng thành công!', 'Thông báo!');

        },
        (error) => {
          console.error('Lỗi đặt hàng:', error);
          this.toastr.error('Lỗi đặt hàng!', 'Thông báo lỗi!');

          // Xử lý lỗi ở đây
        }
      );

    }



  }

  truncateName(tentopping: string, maxLength: number): string {
    if (tentopping.length > maxLength) {
      return tentopping.substring(0, maxLength) + '...';
    } else {
      return tentopping;
    }
  }

}