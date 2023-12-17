import { ObjectId, Schema, model } from "mongoose";
const mongoose = require('mongoose');

const BuyerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  TenKhachHang: String,
  SDT: String,
  DiaChi: String,
  MatKhau: String,
  TaiKhoan: String,
  TichDiem: Number,
  GioHang: [{
    MaSP: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sanpham' 
    },
    ThoiGianThemGH: {
      type: Date,
      default: Date.now // Giá trị mặc định là thời gian hiện tại khi giỏ hàng được thêm vào
    },
    KhuyenMai: String,
    DonGiaKhuyenMai: Number,
    DonGiaSizeLy: {
      SL: Number,
      Size: String,
      Dongia: Number
    },
    DongiaToppings: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        tenTopping: String,
        soluongtopping: Number,
        giatopping: Number,
      }
    ],   
    ThanhTien: Number,
    GhiChu: String,
    _id: false 
  }],
  DiaChis: [
    {
      TenNguoiNhan: { type: String, required: true },
      DiaChi: { type: String, required: true },
      SDT: { type: String, required: true }
    }
  ]
});

export const BuyerModel = mongoose.model('khachhang', BuyerSchema);