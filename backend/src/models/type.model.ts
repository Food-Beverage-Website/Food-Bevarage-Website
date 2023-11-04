import { Schema,model } from "mongoose";

export interface Type {
  MaTieuMuc:String,
  TenTieuMuc: String,
  Poster: String,
  
  }

  export const TypeSchema = new Schema<Type>(
    {
      MaTieuMuc: { type: String, required: true },
      TenTieuMuc: { type: String, required: true },
      Poster: { type: String, required: true },
      
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
  export const TypeModel=model<Type>('tieumuc',TypeSchema);
  