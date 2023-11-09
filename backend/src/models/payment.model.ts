const mongoose = require('mongoose');

const PhuongThucThanhToanSchema = new mongoose.Schema({
  TenPhuongThuc: String
});

export const PaymentModel = mongoose.model('ptthanhtoan', PhuongThucThanhToanSchema);

