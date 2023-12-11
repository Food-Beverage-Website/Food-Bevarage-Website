import { ObjectId, Schema,model } from "mongoose";

export interface Store {
    id:ObjectId,
    TenCuaHang: String,
    ChuSoHuu: String,
    SDT:String,
    DiaChi: String,
    CCCD: String,
    GioMoCua:String,
    GioDongCua: String,
    TaiKhoan: String,
    MatKhau: String,
    Gmail:String,
    ThucDons: [{
      ID: ObjectId;
      TenThucDon: string;
    }];
  }

  export const StoreSchema = new Schema<Store>(
    {
        id:{type:Schema.Types.ObjectId},
        TenCuaHang: { type: String, required: true },
        ChuSoHuu: { type: String, required: true },
        SDT: { type: String, required: true },
        DiaChi: { type: String, required: true },
        CCCD: { type: String, required: true },
        GioMoCua: { type: String, required: true },
        GioDongCua: { type: String, required: true },
        TaiKhoan: { type: String, required: true },
        MatKhau: { type: String, required: true },
        Gmail:{ type: String, required: true },
        ThucDons: [{
          ID: {type:Schema.Types.ObjectId},
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
  