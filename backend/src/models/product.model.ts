import { ObjectId, Schema,model } from "mongoose";

export interface Product {
  _id:ObjectId;
  TenSP: string;
  MieuTa: string;
  DonGia: { Size: string; Gia: number }[];
  Hinh: string;
  NgayDang: string;
  TinhTrang:string;
  MaCH: ObjectId;
  MaThucDon: ObjectId;
  MaTieuMuc: ObjectId;
  DanhGia: [{
    MaDonHang: string;
    Rate: number;
    ChiTiet: string;
    Hinh: string[];
  }];

  }

  const ProductSchema = new Schema<Product>(
  {
      _id:{ type: Schema.Types.ObjectId, required: false },
      TenSP: { type: String, required: true },
      MieuTa: { type: String, required: true },
      DonGia: [{ Size: String, Gia: Number }],
      Hinh:{ type: String, required: true },
      NgayDang :{ type: String, required: true },
      TinhTrang :{ type: String, required: true },
      MaCH: { type: Schema.Types.ObjectId, ref: 'cuahang' },
      MaThucDon: { type: Schema.Types.ObjectId},
      MaTieuMuc: { type:Schema.Types.ObjectId },
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



  export interface Product1{
    id:ObjectId,
    TenSP: string;
    MieuTa: string;
    DonGia: { Size: string; Gia: number }[];
    Hinh: string;
    NgayDang: string;
    TinhTrang:string;
    MaCH: ObjectId;
    MaThucDon: ObjectId;
    MaTieuMuc: ObjectId;
    DanhGia: [];
  
    }
  
  export const ProductModel=model<Product>('sanpham',ProductSchema);