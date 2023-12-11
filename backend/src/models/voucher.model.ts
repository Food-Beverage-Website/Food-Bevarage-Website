const mongoose = require('mongoose');


export class Voucher {
  _id!: string;
TenKhuyenMai!: string;
MaCH!: string;
PhanTramGiam!: string;
NgayBatDau!: string;
NgayKetThuc!: string;
SanPhams!: { _id: string; idsp: string }[];
Hinh!:string
}

const KhuyenMaiSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  TenKhuyenMai: String,
  
  MaCH: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cuahang'
  },
  PhanTramGiam: String,
  NgayBatDau: String,
  NgayKetThuc: String,
  SanPhams: [{
    idsp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sanpham' 
    }
  }],
  Hinh:String
});

export const VoucherModel = mongoose.model('khuyenmai', KhuyenMaiSchema);


