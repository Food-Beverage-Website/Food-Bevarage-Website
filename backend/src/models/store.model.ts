import { ObjectId, Schema,model } from "mongoose";

export interface Store {

    TenCuaHang: String,
    Hinh:String,
    ChuSoHuu: String,
    SDT:String,
    DiaChi: String,
    CCCD: String,
    GioMoCua:String,
    GioDongCua: String,
    TaiKhoan: String,
    MatKhau: String,
    Gmail:String,
    ToaDo:String,
    ThucDons: [{
   
      TenThucDon: string;
    }];
  }

  export const StoreSchema = new Schema<Store>(
    {

        TenCuaHang: { type: String, required: true },
        Hinh: { type: String, required: true },
        ChuSoHuu: { type: String, required: true },
        SDT: { type: String, required: true },
        DiaChi: { type: String, required: true },
        CCCD: { type: String, required: true },
        GioMoCua: { type: String, required: true },
        GioDongCua: { type: String, required: true },
        TaiKhoan: { type: String, required: true },
        MatKhau: { type: String, required: true },
        Gmail:{ type: String, required: true },
        ToaDo:{ type: String, required: true },
        ThucDons: [{
          TenThucDon: { type: String, required: true }
        }],
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
  export const StoreModel=model<Store>('cuahang',StoreSchema);
  