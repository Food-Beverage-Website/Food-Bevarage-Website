import { ObjectId, Schema,model } from "mongoose";

export interface Type {
  id:ObjectId,
  TenTieuMuc: String,
  Poster: String,
  
  }

  export const TypeSchema = new Schema<Type>(
    {
      id:{type:Schema.Types.ObjectId},
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
  