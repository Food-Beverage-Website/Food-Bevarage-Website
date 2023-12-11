export interface IProductAdd{
    TenSP:string,
    MieuTa:string,
    Hinh:string,
    NgayDang?:string,
    TinhTrang:string,
    MaCH:string,
    MaThucDon:string,
    MaTieuMuc:string,
    DonGia:{ Size: string, Gia: string }[]
}

export interface IProducUpdate{
    _id:string,
    TenSP:string,
    MieuTa:string,
    Hinh:string,
    TinhTrang:string,
    MaThucDon:string,
    MaTieuMuc:string,
    DonGia:{ Size: string, Gia: number }[]
}