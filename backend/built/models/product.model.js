"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
var mongoose_1 = require("mongoose");
var ProductSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId, required: false },
    TenSP: { type: String, required: true },
    MieuTa: { type: String, required: true },
    DonGia: [{ Size: String, Gia: Number }],
    Hinh: { type: String, required: true },
    NgayDang: { type: String, required: true },
    TinhTrang: { type: String, required: true },
    Topping: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'topping' }],
    MaCH: { type: mongoose_1.Schema.Types.ObjectId, ref: 'cuahang' },
    MaThucDon: { type: mongoose_1.Schema.Types.ObjectId },
    MaTieuMuc: { type: mongoose_1.Schema.Types.ObjectId },
    DanhGia: [
        {
            MaDonHang: String,
            Rate: Number,
            ChiTiet: String,
            Hinh: [String],
        },
    ],
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
});
exports.ProductModel = (0, mongoose_1.model)('sanpham', ProductSchema);
