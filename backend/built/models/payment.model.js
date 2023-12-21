"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
var mongoose = require('mongoose');
var PhuongThucThanhToanSchema = new mongoose.Schema({
    TenPhuongThuc: String
});
exports.PaymentModel = mongoose.model('ptthanhtoan', PhuongThucThanhToanSchema);
