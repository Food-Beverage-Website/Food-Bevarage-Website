"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeModel = exports.TypeSchema = void 0;
var mongoose_1 = require("mongoose");
exports.TypeSchema = new mongoose_1.Schema({
    id: { type: mongoose_1.Schema.Types.ObjectId },
    TenTieuMuc: { type: String, required: true },
    Poster: { type: String, required: true },
    BannerVideo: { type: String, required: true },
    Background: { type: String, required: true }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});
exports.TypeModel = (0, mongoose_1.model)('tieumuc', exports.TypeSchema);
