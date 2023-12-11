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

