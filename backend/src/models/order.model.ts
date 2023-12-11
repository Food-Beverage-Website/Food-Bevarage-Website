const mongoose = require('mongoose');




const DonHangSchema = new mongoose.Schema({
  KhachHang: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'khachhang',
    required: true
  },
  TongTien: Number,
  NgayDat: Date,
  PhuongThucThanhToan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ptthanhtoan',
    required: true
  },
  TinhTrangDonHang: String,
  ChiTietDonHang: [{
    MaCTDH: Number,
    SanPham: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sanpham'
    },
    SL: Number,
    DonGia: {
      Size: String,
      Dongia: Number
    },
    Topping: [{
        MaTP: String,
        Topping: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'topping'
        },
        DonGia: String,
        SL: Number
      }] // Topping sẽ là một mảng của các ToppingSchema
  }],
  MaCH: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cuahang'
  }// ChiTietDonHang sẽ là một mảng của các ChiTietDonHangSchema
});




export const DonHangModel = mongoose.model('donhang', DonHangSchema);