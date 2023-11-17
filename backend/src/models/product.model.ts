import { ObjectId, Schema,model } from "mongoose";

export interface Product {
  id:ObjectId,
  MaSP: string;
  TenSP: string;
  MieuTa: string;
  DonGia: { Size: string; Gia: number }[];
  Hinh: string[];
  MaCH: ObjectId;
  MaThucDon: string;
  MaTieuMuc: string;
  MaTopping: string[];
  DanhGia: [{
    MaDonHang: string;
    Rate: number;
    ChiTiet: string;
    Hinh: string[];
  }];
  }

  const ProductSchema = new Schema<Product>(
    {
      id:{type:Schema.Types.ObjectId},
      MaSP: { type: String, required: true },
      TenSP: { type: String, required: true },
      MieuTa: { type: String, required: true },
      DonGia: [{ Size: String, Gia: Number }],
      Hinh: [String],
      MaCH: { type: Schema.Types.ObjectId, ref: 'cuahang' },
      MaThucDon: { type: String, required: true },
      MaTieuMuc: { type: String, required: true },
      MaTopping: [String],
      DanhGia: [
        {
          MaDonHang: String,
          Rate: Number,
          ChiTiet: String,
          Hinh: [String],
        },
      ],
    },
    {
      toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true,
      },
      timestamps: true,
    }
  );


  
  export const ProductModel=model<Product>('sanpham',ProductSchema);
  













