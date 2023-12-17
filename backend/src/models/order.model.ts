const mongoose = require('mongoose');




const DonHangSchema = new mongoose.Schema({
  KhachHang: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'khachhang',
    required: true
  },
  paymentId: String,
  TongTien: Number,
  NgayDat: {
    type: Date,
    default: Date.now 
  },
  PhuongThucThanhToan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ptthanhtoan',
    required: true
  },
  TinhTrangDonHang: String,
  ChiTietDonHang: [{
   
    SanPham: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sanpham'
    },
    SL: Number,
    KhuyenMai: String,
    DonGiaKhuyenMai: Number,
    DonGia: {
      Size: String,
      Dongia: Number
    },
    Topping: [{
      
      MaTopping: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'topping'
        },
        DonGia: String,
        SL: Number,
        _id: false
      }] // Topping sẽ là một mảng của các ToppingSchema
  }],
  MaCH: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cuahang',
    required: true
  },
  DiachiGH: String,
  GhiChu: String,
});




export const DonHangModel = mongoose.model('donhang', DonHangSchema);