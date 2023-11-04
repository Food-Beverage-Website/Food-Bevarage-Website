import { Schema,model } from "mongoose";

export interface Product {
  MaSP:String,
  TenSP: String,
  MieuTa: String,
  DonGia: [{ Size: String, Gia: Number }],
  Hinh: [String],
  MaThucDon: String,
  MaTopping: String,
  DanhGia: [{
    MaDonHang: String,
    Rate: Number,
    ChiTiet: String,
    Hinh: [String]
  }]| null;
  }

  export const ProductSchema = new Schema<Product>(
    {
      MaSP: { type: String, required: true },
      TenSP: { type: String, required: true },
      MieuTa: { type: String, required: true },
      DonGia: [{ Size: String, Gia: Number }],
      Hinh: [String],
      MaThucDon: { type: String, required: true },
      MaTopping: { type: String, required: true },
      DanhGia: [
        {
          MaDonHang: String,
          Rate: Number,
          ChiTiet: String,
          Hinh: [String]
        }
      ]
    }, {
      toJSON: {
        virtuals: true
      },
      toObject: {
        virtuals: true
      },
      timestamps: true
    }
  );
  export const ProductModel=model<Product>('sanpham',ProductSchema);
  