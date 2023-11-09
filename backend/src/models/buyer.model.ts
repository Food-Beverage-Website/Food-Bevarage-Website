const mongoose = require('mongoose');

const BuyerSchema = new mongoose.Schema({
  TenKhachHang: String,
  SDT: String,
  DiaChi: String,
  MatKhau: String,
  TaiKhoan: String,
  TichDiem: Number,
  GioHang: [{
    MaID: Number,
    MaSP: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sanpham' 
    },
    SL: Number,
    DonGia: {
      Size: String,
      Dongia: Number
    },
    ThanhTien: Number,
    GhiChu: String
  }]
});

export const BuyerModel = mongoose.model('khachhang', BuyerSchema);
