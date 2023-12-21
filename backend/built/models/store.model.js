"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreModel = exports.StoreSchema = void 0;
var mongoose_1 = require("mongoose");
exports.StoreSchema = new mongoose_1.Schema({
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
    Gmail: { type: String, required: true },
    ToaDo: { type: String, required: true },
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
});
exports.StoreModel = (0, mongoose_1.model)('cuahang', exports.StoreSchema);
