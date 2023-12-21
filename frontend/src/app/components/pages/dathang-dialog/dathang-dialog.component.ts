import { AfterViewInit, Component, DoCheck, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { retry } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/services/order.service';

declare var paypal:any;
@Component({
  selector: 'app-dathang-dialog',
  templateUrl: './dathang-dialog.component.html',
  styleUrls: ['./dathang-dialog.component.css'],
})
export class DathangDialogComponent implements OnInit, DoCheck{
  cartJson: any;

  constructor(private oderService: OrderService, private toastr: ToastrService)  { 
    
  }
  ngDoCheck(): void {
    
  }
  ngOnInit(): void {
  
   
  }

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

  dataPayment!:any;
  

 
  

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

      this.cartJson = {
        NgayDat: currentDateTime.toISOString(),
        paymentId:'null',
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

      
      this.dataPayment=this.cartJson
      return this.cartJson;
    }


  }


  truyenJsonDatHang() {
    if (this.selectedDiaChi == "" || this.selectedThanhToan == "") {
      this.toastr.error("Hãy chọn địa chỉ nhận hàng và phương thức thanh toán")
   
    }
    else if (this.selectedDiaChi == "") {
      this.toastr.error("Hãy chọn địa chỉ nhận hàng", "Thông báo lõi")
     
    }
    else if (this.selectedThanhToan == "") {
      this.toastr.error("Hãy chọn phương thức thanh toán");

    }
    else {
      alert("Mãi chua")
      this.taoJsonThanhToan()
     
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