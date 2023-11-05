import { Schema, model, Document } from "mongoose";

// Interface cho ThucDon
interface MenuItem {
  ID: string;
  TenThucDon: string;
}

// Interface cho MaThucDon
export interface Menu extends Document {
  MaThucDon: string;
  MaCH: string;
  ThucDons: MenuItem[];
}

// Schema cho MaThucDon
const MenuSchema = new Schema<Menu>(
  {
    MaThucDon: { type: String, required: true },
    MaCH: { type: String, required: true },
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
