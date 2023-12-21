"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuModel = void 0;
var mongoose_1 = require("mongoose");
// Schema cho MaThucDon
var MenuSchema = new mongoose_1.Schema({
    MaThucDon: { type: String, required: true },
    MaCH: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'cuahang' },
    ThucDons: [
        {
            ID: String,
            TenThucDon: String,
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
// Model cho MaThucDon
exports.MenuModel = (0, mongoose_1.model)('thucdon', MenuSchema);
