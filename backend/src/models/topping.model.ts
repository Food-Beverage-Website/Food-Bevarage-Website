const mongoose = require('mongoose');

const ToppingSchema = new mongoose.Schema({
  MaCH: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cuahang' // Thay 'CuaHang' bằng tên mô hình của cửa hàng
  },
  Topping: [
    {
      idtopping: {
        type: mongoose.Schema.Types.ObjectId
      },
      tentopping: String,
      hinh: String,
      gia: Number
    }
  ]
});

export const ToppingModel = mongoose.model('topping', ToppingSchema);

