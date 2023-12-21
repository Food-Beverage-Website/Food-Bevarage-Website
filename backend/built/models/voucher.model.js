"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherModel = exports.Voucher = void 0;
var mongoose = require('mongoose');
var Voucher = /** @class */ (function () {
    function Voucher() {
    }
    return Voucher;
}());
exports.Voucher = Voucher;
var KhuyenMaiSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    TenKhuyenMai: String,
    MaCH: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cuahang'
    },
    PhanTramGiam: String,
    NgayBatDau: String,
    NgayKetThuc: String,
    SanPhams: [{
            idsp: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'sanpham'
            }
        }],
    Hinh: String
});
exports.VoucherModel = mongoose.model('khuyenmai', KhuyenMaiSchema);
