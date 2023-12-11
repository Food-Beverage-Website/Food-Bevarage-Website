import { ObjectId, Schema,model } from "mongoose";

const mongoose = require('mongoose');

export interface Topping1 {
  _id: ObjectId;
  MaCH: ObjectId;  
  Topping: [{
    tentopping: string;
    hinh: string;
    gia: number;
  }];
  }

  const ToppingSchema = new Schema<Topping1>(
    {
      _id: {type:Schema.Types.ObjectId},
      MaCH: { type: Schema.Types.ObjectId, ref: 'cuahang' },    
      Topping: [
        {
          _id: {type:Schema.Types.ObjectId},
          tentopping: String,
          hinh: String,
          gia: Number
        },
      ]
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


export const ToppingModel=model<Topping1>('topping',ToppingSchema);