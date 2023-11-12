export class User {
    _id!: string;
    TenKhachHang!: string;
    SDT!: string;
    DiaChi!: string;
    MatKhau!: string;
    TaiKhoan!: string;
    TichDiem!: string;
    GioHang: GioHangItem[] = [];
  }
  
  export class GioHangItem {
    MaID!: number;
    MaSP!: string;
    SL!: number;
    DonGia!: {
      Size: string;
      Dongia: number;
    };
    ThanhTien!: number;
    GhiChu!: string;
  }
  