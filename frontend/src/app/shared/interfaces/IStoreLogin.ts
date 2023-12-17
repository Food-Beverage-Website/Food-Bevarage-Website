export interface IStoreLogin{
    account: string;
    password: string;
}


export interface IStoreNew{
    user: string;
    password: string;
    TenCuaHang: string;
    ChuSoHuu: string;
    DiaChi: string;
    SDT: string;
    CCCD: string;
    Gmail: string;
}

export interface IMenuChange{
    idMenu:string,
    listID: string[];
}

export interface IMenuUpdate{
    Id:string,
    idThucDon:string,
    TenThucDon:string
}

export interface IMenuDelete{
    _id:string,
    idmenu:string,
}


export interface IStoreUpDate{
    _id:string,
    TenShop:string,
    TenChu:string,
     CCCD:string,
     DiaChi:string,
      SDT:string,
       open:string,
        clode:string,
         hinh:string,
}


export interface IStoreDistanceUpdate{
    _id:string,
    ToaDo:string
}

export interface IStoreCategory{
    IdStore:string,
    TenDanhMuc:string
}

export interface IStateOrder{
    _id:string,
    TinhTrang:string
}

