const mongoose = require('mongoose');

const KhuyenMaiSchema = new mongoose.Schema({
  TenKhuyenMai: String,
  MaCH: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CuaHang'
  },
  PhanTramGiam: String,
  NgayBatDau: String,
  NgayKetThuc: String,
  SanPhams: [{
    idsp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sanpham' 
    }
  }]
});

export const VoucherModel = mongoose.model('khuyenmai', KhuyenMaiSchema);


