import { ObjectId, Schema,model } from "mongoose";

const mongoose = require('mongoose');

// const ToppingSchema = new mongoose.Schema({
//   id:{type:mongoose.Schema.Types.ObjectId},  
//   MaCH: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'cuahang' // Thay 'CuaHang' bằng tên mô hình của cửa hàng
//   },
//   Topping: [
//     {
//       idtopping: {
//         type: mongoose.Schema.Types.ObjectId
//       },
//       tentopping: String,
//       hinh: String,
//       gia: Number
//     }
//   ]
// });

export interface Topping1 {
  id:ObjectId;
  MaCH: ObjectId;  
  Topping: [{
    _id: ObjectId;
    tentopping: string;
    hinh: string;
    gia: number;
  }];
  }

  const ToppingSchema = new Schema<Topping1>(
    {
      id:{type:Schema.Types.ObjectId},    
      MaCH: { type: Schema.Types.ObjectId, ref: 'cuahang' },    
      Topping: [
        {
          _id: {type:Schema.Types.ObjectId},
          tentopping: String,
          hinh: String,
          gia: Number,
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

// export const ToppingModel = mongoose.model('topping', ToppingSchema);

export const ToppingModel=model<Topping1>('topping',ToppingSchema);
