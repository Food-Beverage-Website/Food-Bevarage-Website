const mongoose = require('mongoose');

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
  }]
});

export const VoucherModel = mongoose.model('khuyenmai', KhuyenMaiSchema);


