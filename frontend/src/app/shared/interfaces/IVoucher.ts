export interface IVoucherChange{
    idVoucher:string,
    listID: string[];
}


export interface IVoucherUpdate{
    idVoucher:string,
    TenKhuyenMai:string,
    NgayBatDau:string,
    NgayKetThuc:string,
    PhanTramGiam:string,
    Hinh:string
   
}


export interface IVoucherCreate{

    TenKhuyenMai:string,
    NgayBatDau:string,
    MaCH:string,
    NgayKetThuc:string,
    PhanTramGiam:string,
    Hinh:string
   
}

