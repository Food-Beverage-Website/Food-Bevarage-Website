export class Order {
    _id!: string;
    TongTien!:number;
    NgayDat!:Date;
    PhuongThucThanhToan!:string;
    TinhTrangDonHang!: string;
    ChiTietDonHang: chitietdonhang[]=[];
    MaCH!:string;
  }
  export class chitietdonhang {
    MaCTDH!: string;
    SanPham!: string;
    SL!: number;
    DonGia: donGias[]=[]; 
    Topping: toppingItem[]=[];
  }
  export class donGias {
    Size!: string;
    Gia!: number;
  }

  export class toppingItem{
    MaTopping!:string;
    Gia!:number;
    SL!:number;
  }