export class User {
    _id!: string;
    TenKhachHang!: string;
    SDT!: string;
    DiaChi!: string;
    MatKhau!: string;
    TaiKhoan!: string;
    TichDiem!: string;
    GioHang: GioHangItem[] = [];
    DiaChis: diaChis[]=[];
  }
  export class diaChis {
    _id!:string;
    TenNhanHang!: string;
    DiaChi!: string;
    SDT!: string;

  }

  export class GioHangItem {
    MaSP!: string;
    ThoiGianThemGH!: Date;
    SL!: number;
    DonGiaSizeLy!: {
      SL: number;
      Size: string;
      Dongia: number;
    };
    DongiaToppings!: [
      {
        _id: string;
        tenTopping: string;
        soluongtopping: number;
        giatopping: number;
      }
    ]; 
    ThanhTien!: number;
    GhiChu!: string;
  }