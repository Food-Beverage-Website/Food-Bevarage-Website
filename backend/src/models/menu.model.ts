import { Schema, model, Document, ObjectId } from "mongoose";

// Interface cho ThucDon
interface MenuItem {
  ID: string;
  TenThucDon: string;
}

// Interface cho MaThucDon
export interface Menu extends Document {
  MaThucDon: string;
  MaCH: ObjectId;
  ThucDons: MenuItem[];
}

// Schema cho MaThucDon
const MenuSchema = new Schema<Menu>(
  {
    MaThucDon: { type: String, required: true },
    MaCH: { type:Schema.Types.ObjectId, required: true, ref: 'cuahang' },
    ThucDons: [
      {
        ID: String,
        TenThucDon: String,
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

// Model cho MaThucDon
export const MenuModel = model<Menu>('thucdon', MenuSchema);
