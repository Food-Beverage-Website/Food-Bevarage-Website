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
var order_model_1 = require("../models/order.model");
var buyer_model_1 = require("../models/buyer.model");
var router = (0, express_1.Router)();
router.get("/check", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, order_model_1.DonHangModel.countDocuments()];
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
router.get("/getAll", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var DonHang;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, order_model_1.DonHangModel.find().populate('ChiTietDonHang.SanPham')];
            case 1:
                DonHang = _a.sent();
                res.send(DonHang);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/getOrderConfirm/:idStore", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idStore, DonHang;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idStore = req.params.idStore;
                return [4 /*yield*/, order_model_1.DonHangModel.find({ TinhTrangDonHang: 'Chờ xác nhận', MaCH: idStore }).populate('KhachHang', 'TenKhachHang DiaChi')];
            case 1:
                DonHang = _a.sent();
                res.send(DonHang);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/getAllOrderbyIdStore/:idStore", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idStore, DonHang;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idStore = req.params.idStore;
                return [4 /*yield*/, order_model_1.DonHangModel.find({ MaCH: idStore }).populate('KhachHang', 'TenKhachHang DiaChi SDT')];
            case 1:
                DonHang = _a.sent();
                res.send(DonHang);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/getAllOrderbyIdOrder/:idOrder", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idOrder, DonHang;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idOrder = req.params.idOrder;
                return [4 /*yield*/, order_model_1.DonHangModel.find({ _id: idOrder }).populate('KhachHang', 'TenKhachHang DiaChi SDT')];
            case 1:
                DonHang = _a.sent();
                res.send(DonHang);
                return [2 /*return*/];
        }
    });
}); }));
router.post("/orderGioHang", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productGioHangJson, addedMaCH, dem, demtrung, idCuoi, i, chiTietDonHang, buyerId, donHang, updatedChiTietDonHang, newDonHang, aa;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productGioHangJson = req.body.cartJson;
                addedMaCH = "";
                dem = 0;
                demtrung = 0;
                idCuoi = "";
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < productGioHangJson.ChitietDonHang.length)) return [3 /*break*/, 10];
                chiTietDonHang = productGioHangJson.ChitietDonHang[i];
                buyerId = productGioHangJson.ChitietDonHang[i].KhachHang;
                return [4 /*yield*/, order_model_1.DonHangModel.findOne({ MaCH: chiTietDonHang.MaCH, NgayDat: productGioHangJson.NgayDat })];
            case 2:
                donHang = _a.sent();
                if (!(addedMaCH != "" && addedMaCH == chiTietDonHang.MaCH)) return [3 /*break*/, 5];
                updatedChiTietDonHang = {
                    SanPham: chiTietDonHang.SanPham,
                    SL: chiTietDonHang.SL,
                    DonGia: chiTietDonHang.DonGia,
                    Topping: chiTietDonHang.Topping
                };
                // Thêm một phần tử mới vào mảng ChiTietDonHang tại vị trí index của const aa
                // Tìm đơn hàng dựa trên MaCH và NgayDat
                return [4 /*yield*/, order_model_1.DonHangModel.findOneAndUpdate({ _id: idCuoi }, { $push: { ChiTietDonHang: updatedChiTietDonHang } })];
            case 3:
                // Thêm một phần tử mới vào mảng ChiTietDonHang tại vị trí index của const aa
                // Tìm đơn hàng dựa trên MaCH và NgayDat
                _a.sent();
                // Bổ sung lệnh cập nhật cơ sở dữ liệu BuyerModel
                return [4 /*yield*/, buyer_model_1.BuyerModel.findByIdAndUpdate(buyerId, {
                        $pull: {
                            "GioHang": {
                                $and: [
                                    { "MaSP": chiTietDonHang.SanPham },
                                    { "DonGiaSizeLy.Size": chiTietDonHang.DonGia.Size }
                                ]
                            }
                        }
                    })];
            case 4:
                // Bổ sung lệnh cập nhật cơ sở dữ liệu BuyerModel
                _a.sent();
                demtrung++;
                return [3 /*break*/, 8];
            case 5:
                newDonHang = new order_model_1.DonHangModel({
                    KhachHang: chiTietDonHang.KhachHang,
                    TongTien: chiTietDonHang.TongTien,
                    paymentId: productGioHangJson.paymentId,
                    NgayDat: productGioHangJson.NgayDat,
                    PhuongThucThanhToan: productGioHangJson.PhuongThucThanhToan,
                    TinhTrangDonHang: productGioHangJson.TinhTrangDonHang,
                    ChiTietDonHang: [{
                            SanPham: chiTietDonHang.SanPham,
                            SL: chiTietDonHang.SL,
                            KhuyenMai: chiTietDonHang.KhuyenMai,
                            DonGiaKhuyenMai: chiTietDonHang.DonGiaKhuyenMai,
                            DonGia: chiTietDonHang.DonGia,
                            Topping: chiTietDonHang.Topping,
                        }],
                    MaCH: chiTietDonHang.MaCH,
                    DiachiGH: productGioHangJson.DiachiGH,
                    GhiChu: productGioHangJson.GhiChu,
                });
                return [4 /*yield*/, newDonHang.save()];
            case 6:
                aa = _a.sent();
                idCuoi = aa._id;
                addedMaCH = chiTietDonHang.MaCH;
                // Bổ sung lệnh cập nhật cơ sở dữ liệu BuyerModel
                return [4 /*yield*/, buyer_model_1.BuyerModel.findByIdAndUpdate(buyerId, {
                        $pull: {
                            "GioHang": {
                                $and: [
                                    { "MaSP": chiTietDonHang.SanPham },
                                    { "DonGiaSizeLy.Size": chiTietDonHang.DonGia.Size }
                                ]
                            }
                        }
                    })];
            case 7:
                // Bổ sung lệnh cập nhật cơ sở dữ liệu BuyerModel
                _a.sent();
                _a.label = 8;
            case 8:
                dem++;
                _a.label = 9;
            case 9:
                i++;
                return [3 /*break*/, 1];
            case 10:
                res.send({ success: dem, demtrung: demtrung });
                return [2 /*return*/];
        }
    });
}); }));
router.patch("/updateOrder", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _id, TinhTrang, updatedOrder, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, _id = _a._id, TinhTrang = _a.TinhTrang;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, order_model_1.DonHangModel.findOneAndUpdate({ "_id": _id }, {
                        $set: {
                            TinhTrangDonHang: TinhTrang
                        }
                    }, { new: true })];
            case 2:
                updatedOrder = _b.sent();
                if (updatedOrder) {
                    console.log('Đã cập nhật thành công:', updatedOrder);
                    res.status(200).json(updatedOrder);
                }
                else {
                    console.error('Không tìm thấy cửa hàng để cập nhật hoặc có lỗi khi cập nhật');
                    res.status(404).send('Không tìm thấy cửa hàng để cập nhật hoặc có lỗi khi cập nhật');
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error('Lỗi khi cập nhật cửa hàng:', error_1);
                res.status(500).send('Lỗi khi cập nhật cửa hàng');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }));
//Code Duy Hung
router.get("/getAllOrderByBuyer/:buyerId", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var buyerId, ordersInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                buyerId = req.params.buyerId;
                return [4 /*yield*/, order_model_1.DonHangModel.find({ KhachHang: buyerId }).populate('KhachHang')];
            case 1:
                ordersInfo = _a.sent();
                if (!ordersInfo) {
                    throw { status: 404, message: 'Không có đơn hàng nào' };
                }
                res.send(ordersInfo);
                return [2 /*return*/];
        }
    });
}); }));
router.patch("/cancelOrder/:orderId", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = req.params.orderId;
                return [4 /*yield*/, order_model_1.DonHangModel.findById(orderId)];
            case 1:
                order = _a.sent();
                if (!order) {
                    throw { status: 404, message: 'Không tìm thấy đơn hàng' };
                }
                order.TinhTrangDonHang = "Đã hủy";
                return [4 /*yield*/, order.save()];
            case 2:
                _a.sent();
                res.send({ message: 'Đã hủy đơn hàng thành công' });
                return [2 /*return*/];
        }
    });
}); }));
router.patch("/xacNhanOrder/:orderId", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = req.params.orderId;
                return [4 /*yield*/, order_model_1.DonHangModel.findById(orderId)];
            case 1:
                order = _a.sent();
                if (!order) {
                    throw { status: 404, message: 'Không tìm thấy đơn hàng' };
                }
                order.TinhTrangDonHang = "Đã giao";
                return [4 /*yield*/, order.save()];
            case 2:
                _a.sent();
                res.send({ message: 'Xác nhận đơn hàng đã giao thành công' });
                return [2 /*return*/];
        }
    });
}); }));
exports.default = router;
