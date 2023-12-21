"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeModel = void 0;
var mongoose = require('mongoose');
var CodeSchema = new mongoose.Schema({
    code: String
});
exports.CodeModel = mongoose.model('code', CodeSchema);
