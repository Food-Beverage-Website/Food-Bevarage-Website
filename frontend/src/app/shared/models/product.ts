export class Product {
    _id!:string ;
    TenSP!: string;
    MieuTa!: string;
    DonGia!: {
      Size: string;
      Gia: number;
    }[];
    Hinh!: string; 
    NgayDang!:string;
    TinhTrang!:string;
    MaCH!:string;
    Topping!:string;
    MaThucDon!: string;
    MaTieuMuc!:string
    DanhGia!: {
      MaDonHang: string;
      Rate: number;
      ChiTiet: string;
      Hinh: string;
    }[];
}