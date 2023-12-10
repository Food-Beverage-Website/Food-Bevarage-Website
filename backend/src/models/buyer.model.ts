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

// export interface khachhang {
//   id:ObjectId;
//   SDT: String;
//   DiaChi: String;
//   MatKhau: String;
//   TaiKhoan: String;
//   TichDiem: Number;
//   GioHang:[
//     {
//       MaSP: ObjectId;
//       TTCuaHang:{
//         MaCH: String;
//         TenCuaHang: String;
//       },
//       DonGiaSizeLy:{
//         SL: Number;
//         Size: String;
//         Dongia: Number;  
//       };
//       DongiaToppings: [
//         {
//           tenTopping: String;
//           soluongtopping: String;                            
//           giatopping: Number;
//         }
//       ],
//       TongGiaSizeLy: Number;
//       TongGiaTopping: Number;
//       ThanhTien: Number;
//       GhiChu: String;
//     }
//   ];
//   }

//   const KhachHangSchema = new Schema<khachhang>(
//     {
//       id:{type:Schema.Types.ObjectId},    
//       SDT: { type: String, required: true },
//       DiaChi: { type: String, required: true },
//       MatKhau: { type: String, required: true },
//       TaiKhoan: { type: String, required: true },
//       TichDiem: { type: String, required: true },
//       GioHang:[
//         {
//           MaSP: { type: Schema.Types.ObjectId, ref: 'sanpham' },
//           TTCuaHang:{
//             MaCH: String,
//             TenCuaHang: String,
//           },
//           DonGiaSizeLy:{
//             SL: Number,
//             Size: String,
//             Dongia: Number,  
//           },
//           DongiaToppings: [
//             {
//               tenTopping: String,
//               soluongtopping: String,
//               giatopping: Number
//             }
//           ],
//           TongGiaSizeLy: Number,
//           TongGiaTopping: Number,
//           ThanhTien: Number,
//           GhiChu: String
//         }
//       ],
//     },
//     {
//       toJSON: {
//         virtuals: true,
//       },
//       toObject: {
//         virtuals: true,
//       },
//       timestamps: true,
//     }
//   );

// export const BuyerModel=model<khachhang>('sanpham',KhachHangSchema);


