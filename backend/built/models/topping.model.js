"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToppingModel = void 0;
var mongoose_1 = require("mongoose");
var mongoose = require('mongoose');
var ToppingSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId },
    MaCH: { type: mongoose_1.Schema.Types.ObjectId, ref: 'cuahang' },
    Topping: [
        {
            _id: { type: mongoose_1.Schema.Types.ObjectId },
            tentopping: String,
            hinh: String,
            gia: Number
        },
    ]
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
});
exports.ToppingModel = (0, mongoose_1.model)('topping', ToppingSchema);
