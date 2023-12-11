export interface IUserLogin{
    account: string;
    password: string;
}

export interface IUserAddAddress{
    idKhachHang:string;
    TenNhanHang:string;
    DiaChi:string;
    SDT:string
}

export interface IUserInfor{
    user:string
    password:string
    TenKhachHang:string
    DiaChi:string
    SDT:string | null;
    Gmail:string
}