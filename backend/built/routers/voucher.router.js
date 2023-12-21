"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var voucher_model_1 = require("../models/voucher.model");
var product_model_1 = require("../models/product.model");
var mongoose_1 = __importDefault(require("mongoose"));
var buyer_model_1 = require("../models/buyer.model");
var router = (0, express_1.Router)();
router.get("/getType", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, voucher_model_1.VoucherModel.countDocuments()];
            case 1:
                productsCount = _a.sent();
                if (productsCount > 0) {
                    res.send("Get is ready");
                    return [2 /*return*/];
                }
                else {
                    res.send("Get isnt ready");
                    return [2 /*return*/];
                }
                return [2 /*return*/];
        }
    });
}); }));
router.get("/getAllbyIDStore/:idStore", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var storeId, voucher;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                storeId = req.params.idStore;
                return [4 /*yield*/, voucher_model_1.VoucherModel.find({ MaCH: storeId })];
            case 1:
                voucher = _a.sent();
                res.send(voucher);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/getAll", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var voucher;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, voucher_model_1.VoucherModel.find()];
            case 1:
                voucher = _a.sent();
                res.send(voucher);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/getproductbyIDvoucher/:idVoucher", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, voucher, idSanPham, productIds, sanpham;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.idVoucher;
                return [4 /*yield*/, voucher_model_1.VoucherModel.findById(Id)];
            case 1:
                voucher = _a.sent();
                idSanPham = voucher.SanPhams;
                productIds = idSanPham.map(function (product) { return product.idsp; });
                return [4 /*yield*/, product_model_1.ProductModel.find({ _id: { $in: productIds } })];
            case 2:
                sanpham = _a.sent();
                res.send(sanpham);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/noneProductVoucher/:idVoucher", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Idvoucher, voucher, voucherList, idSanPham, sanpham;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Idvoucher = req.params.idVoucher;
                return [4 /*yield*/, voucher_model_1.VoucherModel.findById(Idvoucher)];
            case 1:
                voucher = _a.sent();
                return [4 /*yield*/, voucher_model_1.VoucherModel.find({ MaCH: voucher.MaCH })];
            case 2:
                voucherList = _a.sent();
                idSanPham = [];
                voucherList.forEach(function (element) {
                    element.SanPhams.forEach(function (e) {
                        idSanPham.push(e.idsp);
                    });
                });
                return [4 /*yield*/, product_model_1.ProductModel.find({ _id: { $nin: idSanPham }, MaCH: voucher.MaCH })];
            case 3:
                sanpham = _a.sent();
                res.send(sanpham);
                return [2 /*return*/];
        }
    });
}); }));
router.post("/changeAppliedProduct", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, idVoucher, _b, listID, query, update, options, updatedVoucher, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, idVoucher = _a.idVoucher, _b = _a.listID, listID = _b === void 0 ? [] : _b;
                query = {
                    _id: idVoucher,
                };
                update = {
                    $pull: {
                        'SanPhams': {
                            idsp: { $in: listID },
                        },
                    },
                };
                options = {
                    new: true, // Trả về dữ liệu mới sau khi cập nhật
                };
                return [4 /*yield*/, voucher_model_1.VoucherModel.findOneAndUpdate(query, update, options)];
            case 1:
                updatedVoucher = _c.sent();
                if (updatedVoucher) {
                    console.log('Thông tin Voucher sau khi xóa:', updatedVoucher);
                    res.status(200).json({ success: true, message: 'Xóa Voucher thành công' });
                }
                else {
                    console.error('Không tìm thấy Voucher hoặc có lỗi khi xóa.');
                    res.status(404).json({ success: false, message: 'Không tìm thấy Voucher hoặc có lỗi khi xóa' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _c.sent();
                // Xử lý lỗi nếu có
                console.error('Lỗi khi xóa Voucher:', error_1);
                res.status(500).json({ success: false, message: 'Lỗi khi xóa Voucher' + error_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
router.post("/addApplyProduct", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, idVoucher, _b, listID, query, update, options, updatedVoucher, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, idVoucher = _a.idVoucher, _b = _a.listID, listID = _b === void 0 ? [] : _b;
                query = {
                    _id: idVoucher,
                };
                update = {
                    $push: {
                        'SanPhams': {
                            $each: listID.map(function (id) { return ({ idsp: id }); }),
                        },
                    },
                };
                options = {
                    new: true, // Trả về dữ liệu mới sau khi cập nhật
                };
                return [4 /*yield*/, voucher_model_1.VoucherModel.findOneAndUpdate(query, update, options)];
            case 1:
                updatedVoucher = _c.sent();
                if (updatedVoucher) {
                    console.log('Thông tin Voucher sau khi thêm:', updatedVoucher);
                    res.status(200).json({ success: true, message: 'Thêm Voucher thành công' });
                }
                else {
                    console.error('Không tìm thấy Voucher hoặc có lỗi khi thêm.');
                    res.status(404).json({ success: false, message: 'Không tìm thấy Voucher hoặc có lỗi khi thêm' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _c.sent();
                // Xử lý lỗi nếu có
                console.error('Lỗi khi thêm Voucher:', error_2);
                res.status(500).json({ success: false, message: 'Lỗi khi thêm Voucher' + error_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
router.post("/createVoucher", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, TenKhuyenMai, MaCH, NgayBatDau, NgayKetThuc, PhanTramGiam, Hinh, newVoucher, savedVoucher, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, TenKhuyenMai = _a.TenKhuyenMai, MaCH = _a.MaCH, NgayBatDau = _a.NgayBatDau, NgayKetThuc = _a.NgayKetThuc, PhanTramGiam = _a.PhanTramGiam, Hinh = _a.Hinh;
                newVoucher = new voucher_model_1.VoucherModel({
                    _id: new mongoose_1.default.Types.ObjectId(),
                    TenKhuyenMai: TenKhuyenMai,
                    NgayBatDau: NgayBatDau,
                    MaCH: MaCH,
                    NgayKetThuc: NgayKetThuc,
                    PhanTramGiam: PhanTramGiam,
                    Hinh: Hinh
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, newVoucher.save()];
            case 2:
                savedVoucher = _b.sent();
                console.log('Đã thêm sản phẩm thành công:', savedVoucher);
                res.status(201).json(savedVoucher); // Trả về thông tin sản phẩm đã thêm
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                console.error('Lỗi khi thêm sản phẩm:', error_3);
                res.status(500).send('Lỗi khi thêm sản phẩm' + error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }));
router.patch("/updateVoucher", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, idVoucher, TenKhuyenMai, NgayBatDau, NgayKetThuc, PhanTramGiam, Hinh, updatedVoucher;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, idVoucher = _a.idVoucher, TenKhuyenMai = _a.TenKhuyenMai, NgayBatDau = _a.NgayBatDau, NgayKetThuc = _a.NgayKetThuc, PhanTramGiam = _a.PhanTramGiam, Hinh = _a.Hinh;
                return [4 /*yield*/, voucher_model_1.VoucherModel.findOneAndUpdate({ _id: idVoucher }, {
                        $set: {
                            TenKhuyenMai: TenKhuyenMai,
                            NgayBatDau: NgayBatDau,
                            NgayKetThuc: NgayKetThuc,
                            PhanTramGiam: PhanTramGiam,
                            Hinh: Hinh
                        }
                    }, { new: true })];
            case 1:
                updatedVoucher = _b.sent();
                if (updatedVoucher) {
                    console.log('Đã cập nhật khuyến mãi thành công:', updatedVoucher);
                    res.status(200).json(updatedVoucher);
                }
                else {
                    console.error('Không tìm thấy khuyến mãi để cập nhật hoặc có lỗi khi cập nhật');
                    res.status(404).send('Không tìm thấy khuyến mãi để cập nhật hoặc có lỗi khi cập nhật');
                }
                return [2 /*return*/];
        }
    });
}); }));
router.delete("/deleteVoucher/:id", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, deletedVoucher, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, voucher_model_1.VoucherModel.findOneAndDelete({ _id: _id })];
            case 2:
                deletedVoucher = _a.sent();
                if (deletedVoucher) {
                    console.log('Đã xóa khuyến mãi thành công:', deletedVoucher);
                    res.status(200).json(deletedVoucher);
                }
                else {
                    console.error('Không tìm thấy khuyến mãi để xóa hoặc có lỗi khi xóa');
                    res.status(404).send('Không tìm thấy khuyến mãi để xóa hoặc có lỗi khi xóa');
                }
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error('Lỗi khi xóa khuyến mãi:', error_4);
                res.status(500).send('Lỗi khi xóa khuyến mãi');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }));
//====================================================
//Duy Minh
router.post("/listKhuyenMaiTheoCuaHangSP", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productGioHangJson, danhsachKhuyenMai, _i, productGioHangJson_1, item, km;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productGioHangJson = req.body.productGioHangJson;
                danhsachKhuyenMai = [];
                _i = 0, productGioHangJson_1 = productGioHangJson;
                _a.label = 1;
            case 1:
                if (!(_i < productGioHangJson_1.length)) return [3 /*break*/, 4];
                item = productGioHangJson_1[_i];
                return [4 /*yield*/, voucher_model_1.VoucherModel.find({ MaCH: item.MaCH, "SanPhams.idsp": item.MaSP })];
            case 2:
                km = _a.sent();
                danhsachKhuyenMai.push(km);
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                res.send(danhsachKhuyenMai);
                return [2 /*return*/];
        }
    });
}); }));
router.post("/listKhuyenMaiTheoGioHang", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var buyerId, buyer, danhsachKhuyenMai, addedMaCH, _i, _a, item, km;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                buyerId = req.body.idKhachHang;
                return [4 /*yield*/, buyer_model_1.BuyerModel.findById(buyerId)
                        .populate({
                        path: 'GioHang.MaSP',
                        populate: {
                            path: 'MaCH',
                            model: 'cuahang' // Thay 'Cuahang' bằng tên chính xác của collection CuaHang
                        }
                    })
                        .lean()];
            case 1:
                buyer = _b.sent();
                addedMaCH = [];
                _i = 0, _a = buyer.GioHang;
                _b.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                item = _a[_i];
                if (!!addedMaCH.includes(item.MaSP.MaCH._id.toString())) return [3 /*break*/, 4];
                return [4 /*yield*/, voucher_model_1.VoucherModel.find({ MaCH: item.MaSP.MaCH._id, "SanPhams.idsp": item.MaSP._id })];
            case 3:
                km = _b.sent();
                // Kiểm tra xem km có rỗng không
                if (km.length > 0) {
                    if (!danhsachKhuyenMai) {
                        danhsachKhuyenMai = []; // Khởi tạo mảng nếu nó chưa tồn tại
                    }
                    danhsachKhuyenMai.push(km);
                    addedMaCH.push(item.MaSP.MaCH._id.toString());
                }
                _b.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                res.send(danhsachKhuyenMai);
                return [2 /*return*/];
        }
    });
}); }));
exports.default = router;
