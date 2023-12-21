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
var store_model_1 = require("../models/store.model");
var order_model_1 = require("../models/order.model");
var product_model_1 = require("../models/product.model");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var moment_1 = __importDefault(require("moment"));
var router = (0, express_1.Router)();
var nodemailer = require("nodemailer");
router.get("/getStore", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store_model_1.StoreModel.countDocuments()];
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
router.get("/getStorebyId/:idStore", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idStore, store;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idStore = req.params.idStore;
                return [4 /*yield*/, store_model_1.StoreModel.findById(idStore)];
            case 1:
                store = _a.sent();
                res.send(store);
                return [2 /*return*/];
        }
    });
}); }));
router.post('/addNewCategory', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, IdStore, TenDanhMuc, store, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, IdStore = _a.IdStore, TenDanhMuc = _a.TenDanhMuc;
                return [4 /*yield*/, store_model_1.StoreModel.findById(IdStore)];
            case 1:
                store = _b.sent();
                // Nếu cửa hàng không tồn tại, có thể xử lý theo ý của bạn (ví dụ: trả về lỗi)
                if (!store) {
                    return [2 /*return*/, res.status(404).json({ message: 'Không tìm thấy cửa hàng.' })];
                }
                // Thêm TenThucDon vào mảng ThucDons
                store.ThucDons.push({ TenThucDon: TenDanhMuc });
                // Lưu cập nhật
                return [4 /*yield*/, store.save()];
            case 2:
                // Lưu cập nhật
                _b.sent();
                res.status(200).json({ message: 'Thêm danh mục mới thành công.' });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error(error_1);
                res.status(500).json({ message: error_1 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/get", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, store;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.query._id;
                return [4 /*yield*/, store_model_1.StoreModel.findById(_id)];
            case 1:
                store = _a.sent();
                res.send(store);
                return [2 /*return*/];
        }
    });
}); }));
router.post("/register", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user, password, TenCuaHang, ChuSoHuu, DiaChi, SDT, CCCD, Gmail, defaultCustomer, savedCustomer, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, user = _a.user, password = _a.password, TenCuaHang = _a.TenCuaHang, ChuSoHuu = _a.ChuSoHuu, DiaChi = _a.DiaChi, SDT = _a.SDT, CCCD = _a.CCCD, Gmail = _a.Gmail;
                defaultCustomer = new store_model_1.StoreModel({
                    TaiKhoan: user,
                    MatKhau: password,
                    Hinh: "OIP (4).jpg",
                    TenCuaHang: TenCuaHang,
                    ChuSoHuu: ChuSoHuu,
                    DiaChi: DiaChi,
                    SDT: SDT,
                    CCCD: CCCD,
                    Gmail: Gmail,
                    GioDongCua: "00:00",
                    GioMoCua: "00:00",
                    ThucDons: [{
                            TenThucDon: "Tất cả"
                        }],
                    ToaDo: "13.467049552728763, 112.30854877903359"
                });
                return [4 /*yield*/, defaultCustomer.save()];
            case 1:
                savedCustomer = _b.sent();
                res.status(201).json(savedCustomer); // Respond with the saved document
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.error('Lỗi khi thêm cửa hàng:', error_2);
                res.status(500).json({ message: 'Lỗi khi thêm cửa hàng', error: error_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
router.get("/getStorebyname/:namesearch", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Storename, store;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Storename = req.params.namesearch;
                return [4 /*yield*/, store_model_1.StoreModel.find({ TenCuaHang: { $regex: Storename, $options: 'i' } })];
            case 1:
                store = _a.sent();
                res.send(store);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/test1/:namesearch", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Storename, store;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Storename = req.params.namesearch;
                return [4 /*yield*/, store_model_1.StoreModel.find({ '_id': Storename })];
            case 1:
                store = _a.sent();
                res.send(store);
                return [2 /*return*/];
        }
    });
}); }));
router.patch("/addApplyProduct", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, idMenu_1, _b, listID, updatedProducts, error_3;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, idMenu_1 = _a.idMenu, _b = _a.listID, listID = _b === void 0 ? [] : _b;
                return [4 /*yield*/, Promise.all(listID.map(function (element) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, product_model_1.ProductModel.findOneAndUpdate({ _id: element }, {
                                        $set: {
                                            MaThucDon: idMenu_1
                                        }
                                    }, { new: true })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); }))];
            case 1:
                updatedProducts = _c.sent();
                if (updatedProducts.length > 0) {
                    console.log('Thông tin Sản phẩm sau khi cập nhật:', updatedProducts);
                    res.status(200).json({ success: true, message: 'Cập nhật Sản phẩm thành công' });
                }
                else {
                    console.error('Không tìm thấy Sản phẩm hoặc có lỗi khi cập nhật.');
                    res.status(404).json({ success: false, message: 'Không tìm thấy Sản phẩm hoặc có lỗi khi cập nhật' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _c.sent();
                // Xử lý lỗi nếu có
                console.error('Lỗi khi cập nhật Sản phẩm:', error_3);
                res.status(500).json({ success: false, message: 'Lỗi khi cập nhật Sản phẩm' + error_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
router.put("/updateThucDon", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, Id, idThucDon, TenThucDon, updatedThucdon, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, Id = _a.Id, idThucDon = _a.idThucDon, TenThucDon = _a.TenThucDon;
                return [4 /*yield*/, store_model_1.StoreModel.findOneAndUpdate({ '_id': Id, 'ThucDons._id': idThucDon }, {
                        $set: {
                            'ThucDons.$.TenThucDon': TenThucDon
                        },
                    }, { new: true })];
            case 1:
                updatedThucdon = _b.sent();
                if (updatedThucdon) {
                    console.log('Thông tin Thực đơn sau khi cập nhật:', updatedThucdon);
                    res.status(200).json({ success: true, message: 'Cập nhật thông tin Thực đơn thành công' });
                }
                else {
                    console.error('Không tìm thấy Thực đơn hoặc có lỗi khi cập nhật.');
                    res.status(404).json({ success: false, message: 'Không tìm thấy Thực đơn hoặc có lỗi khi cập nhật.' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                console.error('Lỗi khi cập nhật Thực đơn:', error_4);
                res.status(500).json({ success: false, message: 'Lỗi khi cập nhật Thực đơn' + error_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
router.post("/deleteThucDon", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _id, idmenu, query, update, options, updatedThucDons, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, _id = _a._id, idmenu = _a.idmenu;
                query = {
                    '_id': _id,
                };
                update = {
                    $pull: {
                        'ThucDons': {
                            _id: idmenu,
                        },
                    },
                };
                options = {
                    new: true, // Trả về dữ liệu mới sau khi cập nhật
                };
                return [4 /*yield*/, store_model_1.StoreModel.findOneAndUpdate(query, update, options)];
            case 1:
                updatedThucDons = _b.sent();
                // Kiểm tra và xử lý kết quả
                if (updatedThucDons) {
                    console.log('Thông tin Topping sau khi xóa:', updatedThucDons);
                    res.status(200).json({ success: true, message: 'Xóa Topping thành công' });
                }
                else {
                    console.error('Không tìm thấy Topping hoặc có lỗi khi xóa.');
                    res.status(404).json({ success: false, message: 'Không tìm thấy Topping hoặc có lỗi khi xóa' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                // Xử lý lỗi nếu có
                console.error('Lỗi khi xóa Topping:', error_5);
                res.status(500).json({ success: false, message: 'Lỗi khi xóa Topping' + error_5 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
router.patch("/updateStore", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _id, TenShop, TenChu, CCCD, DiaChi, SDT, open, clode, hinh, updatedStore;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, _id = _a._id, TenShop = _a.TenShop, TenChu = _a.TenChu, CCCD = _a.CCCD, DiaChi = _a.DiaChi, SDT = _a.SDT, open = _a.open, clode = _a.clode, hinh = _a.hinh;
                return [4 /*yield*/, store_model_1.StoreModel.findOneAndUpdate({ _id: _id }, {
                        $set: {
                            TenCuaHang: TenShop,
                            ChuSoHuu: TenChu,
                            CCCD: CCCD,
                            DiaChi: DiaChi,
                            SDT: SDT,
                            GioMoCua: open,
                            GioDongCua: clode,
                            Hinh: hinh
                        }
                    }, { new: true })];
            case 1:
                updatedStore = _b.sent();
                if (updatedStore) {
                    console.log('Đã cập nhật thành công:', updatedStore);
                    res.status(200).json(updatedStore);
                }
                else {
                    console.error('Không tìm thấy  để cập nhật hoặc có lỗi khi cập nhật');
                    res.status(404).send('Không tìm thấy để cập nhật hoặc có lỗi khi cập nhật');
                }
                return [2 /*return*/];
        }
    });
}); }));
router.patch("/updateToaDo", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _id, ToaDo, DiaChi, updatedStore, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, _id = _a._id, ToaDo = _a.ToaDo, DiaChi = _a.DiaChi;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store_model_1.StoreModel.findOneAndUpdate({ _id: _id }, {
                        $set: {
                            ToaDo: ToaDo,
                            DiaChi: DiaChi
                        }
                    }, { new: true })];
            case 2:
                updatedStore = _b.sent();
                if (updatedStore) {
                    console.log('Đã cập nhật thành công:', updatedStore);
                    res.status(200).json(updatedStore);
                }
                else {
                    console.error('Không tìm thấy cửa hàng để cập nhật hoặc có lỗi khi cập nhật');
                    res.status(404).send('Không tìm thấy cửa hàng để cập nhật hoặc có lỗi khi cập nhật');
                }
                return [3 /*break*/, 4];
            case 3:
                error_6 = _b.sent();
                console.error('Lỗi khi cập nhật cửa hàng:', error_6);
                res.status(500).send('Lỗi khi cập nhật cửa hàng');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }));
router.get("/get_Store_All", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var stores, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store_model_1.StoreModel.find()];
            case 1:
                stores = _a.sent();
                res.send(stores);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.error('Error fetching stores:', error_7);
                res.status(500).send({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
router.get("/top5_store", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sanPhams, storeIds, storeInfoList, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, product_model_1.ProductModel.aggregate([
                        {
                            $lookup: {
                                from: "donhangs",
                                localField: "_id",
                                foreignField: "ChiTietDonHang.SanPham",
                                as: "donHangs"
                            }
                        },
                        {
                            $unwind: "$donHangs"
                        },
                        {
                            $unwind: "$donHangs.ChiTietDonHang"
                        },
                        {
                            $group: {
                                _id: {
                                    _id: "$_id",
                                    MaCH: "$MaCH",
                                    TenSP: "$TenSP"
                                },
                                SoLuongTrongDonHang: {
                                    $sum: "$donHangs.ChiTietDonHang.SL"
                                }
                            }
                        },
                        {
                            $match: {
                                SoLuongTrongDonHang: { $ne: 0 }
                            }
                        }
                    ])];
            case 1:
                sanPhams = _a.sent();
                storeIds = sanPhams.map(function (sp) { return sp._id.MaCH; });
                return [4 /*yield*/, store_model_1.StoreModel.find({ _id: { $in: storeIds } })];
            case 2:
                storeInfoList = _a.sent();
                res.send(storeInfoList);
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }));
router.post("/login", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, account, password, store;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, account = _a.account, password = _a.password;
                return [4 /*yield*/, store_model_1.StoreModel.findOne({ TaiKhoan: account, MatKhau: password })];
            case 1:
                store = _b.sent();
                if (store) {
                    res.send(generateTokenResponse(store));
                }
                else {
                    res.status(400).send("Account or password store isn't true");
                }
                return [2 /*return*/];
        }
    });
}); }));
var generateTokenResponse = function (store) {
    var token = jsonwebtoken_1.default.sign({ Account: store.TaiKhoan }, "keyyyyy", {
        expiresIn: "30d"
    });
    store.token = token;
    return store;
};
router.post("/thongke_Thang_SoDon_store", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idStore, store_ch, currentDate, startOfThreeMonthsAgo_1, don_hoanthanh3thang_1, don_huy3thang_1, tongSoDon3thang_1, monthNames_1, thongkestore, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                idStore = req.body.MaCH.MaCH;
                console.log('Cửa hàng!:', idStore);
                return [4 /*yield*/, order_model_1.DonHangModel.find({ MaCH: idStore })];
            case 1:
                store_ch = _a.sent();
                currentDate = new Date();
                startOfThreeMonthsAgo_1 = (0, moment_1.default)(currentDate).subtract(2, 'months').startOf('month').toDate();
                don_hoanthanh3thang_1 = Array(3).fill(0);
                don_huy3thang_1 = Array(3).fill(0);
                tongSoDon3thang_1 = Array(3).fill(0);
                monthNames_1 = Array(3).fill(null);
                store_ch.forEach(function (donHang) {
                    var isAfterStartOfThreeMonthsAgo = (0, moment_1.default)(donHang.NgayDat).isAfter(startOfThreeMonthsAgo_1);
                    var monthDiff = (0, moment_1.default)(donHang.NgayDat).diff(startOfThreeMonthsAgo_1, 'months');
                    if (isAfterStartOfThreeMonthsAgo && monthDiff < 3) {
                        var monthName = (0, moment_1.default)(donHang.NgayDat).format("MM"); // Lấy tên tháng
                        // Sử dụng biến tạm thời để lưu trữ tên tháng
                        var temporaryMonthName = "Th\u00E1ng ".concat(monthName);
                        if (donHang.TinhTrangDonHang === "Đã giao") {
                            don_hoanthanh3thang_1[monthDiff] += 1;
                            tongSoDon3thang_1[monthDiff] += 1;
                        }
                        else if (donHang.TinhTrangDonHang === "Đã hủy") {
                            don_huy3thang_1[monthDiff] += 1;
                            tongSoDon3thang_1[monthDiff] += 1;
                        }
                        var tent = parseInt(monthName, 10) - 2;
                        for (var i = 0; i < monthDiff; i++) {
                            var tt = "Th\u00E1ng ".concat(tent);
                            if (!monthNames_1[i]) {
                                monthNames_1[i] = tt;
                            }
                            tent++;
                        }
                        // Nếu mảng monthNames chưa có giá trị tại vị trí monthDiff, gán giá trị vào
                        if (!monthNames_1[monthDiff]) {
                            monthNames_1[monthDiff] = temporaryMonthName;
                        }
                    }
                });
                thongkestore = {
                    don_hoanthanh3thang: don_hoanthanh3thang_1,
                    don_huy3thang: don_huy3thang_1,
                    tongSoDon3thang: tongSoDon3thang_1,
                    monthNames: monthNames_1,
                };
                res.send(thongkestore);
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                console.error(error_9);
                res.status(500).send("Internal Server Error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/thongke_Thang_DoanhThu_store", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idStore, store_ch, currentDate, startOfThreeMonthsAgo_2, don_doanhthu3thang_1, monthNames_2, thongkestore, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                idStore = req.body.MaCH.MaCH;
                return [4 /*yield*/, order_model_1.DonHangModel.find({ MaCH: idStore })];
            case 1:
                store_ch = _a.sent();
                currentDate = new Date();
                startOfThreeMonthsAgo_2 = (0, moment_1.default)(currentDate).subtract(2, 'months').startOf('month').toDate();
                don_doanhthu3thang_1 = Array(3).fill(0);
                monthNames_2 = Array(3).fill(null);
                store_ch.forEach(function (donHang) {
                    var isAfterStartOfThreeMonthsAgo = (0, moment_1.default)(donHang.NgayDat).isAfter(startOfThreeMonthsAgo_2);
                    var monthDiff = (0, moment_1.default)(donHang.NgayDat).diff(startOfThreeMonthsAgo_2, 'months');
                    if (isAfterStartOfThreeMonthsAgo && monthDiff < 3) {
                        var monthName = (0, moment_1.default)(donHang.NgayDat).format("MM"); // Lấy tên tháng
                        // Sử dụng biến tạm thời để lưu trữ tên tháng
                        var temporaryMonthName = "Th\u00E1ng ".concat(monthName);
                        if (donHang.TinhTrangDonHang === "Đã giao") {
                            don_doanhthu3thang_1[monthDiff] += donHang.TongTien;
                        }
                        var tent = parseInt(monthName, 10) - 2;
                        for (var i = 0; i < monthDiff; i++) {
                            var tt = "Th\u00E1ng ".concat(tent);
                            if (!monthNames_2[i]) {
                                monthNames_2[i] = tt;
                            }
                            tent++;
                        }
                        // Nếu mảng monthNames chưa có giá trị tại vị trí monthDiff, gán giá trị vào
                        if (!monthNames_2[monthDiff]) {
                            monthNames_2[monthDiff] = temporaryMonthName;
                        }
                    }
                });
                thongkestore = {
                    don_doanhthu3thang: don_doanhthu3thang_1,
                    monthNames: monthNames_2,
                };
                res.send(thongkestore);
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                console.error(error_10);
                res.status(500).send("Internal Server Error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/thongke_7ngay_SoDon_store", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idStore, store_ch, currentDate, startOfSevenDaysAgo_1, don_hoanthanh7ngay_1, don_huy7ngay_1, tongSoDon7ngay_1, dayNames_1, currentDayName, thongkestore, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                idStore = req.body.MaCH.MaCH;
                console.log('Cửa hàng!:', idStore);
                return [4 /*yield*/, order_model_1.DonHangModel.find({ MaCH: idStore })];
            case 1:
                store_ch = _a.sent();
                currentDate = new Date();
                startOfSevenDaysAgo_1 = (0, moment_1.default)(currentDate).subtract(6, 'days').startOf('day').toDate();
                don_hoanthanh7ngay_1 = Array(7).fill(0);
                don_huy7ngay_1 = Array(7).fill(0);
                tongSoDon7ngay_1 = Array(7).fill(0);
                dayNames_1 = Array(7).fill(null);
                store_ch.forEach(function (donHang) {
                    var isAfterStartOfSevenDaysAgo = (0, moment_1.default)(donHang.NgayDat).isAfter(startOfSevenDaysAgo_1);
                    var dayDiff = (0, moment_1.default)(donHang.NgayDat).diff(startOfSevenDaysAgo_1, 'days');
                    if (isAfterStartOfSevenDaysAgo && dayDiff < 7) {
                        var dayName = (0, moment_1.default)(donHang.NgayDat).format("DD/MM"); // Lấy ngày + tháng
                        // Sử dụng biến tạm thời để lưu trữ ngày + tháng
                        var temporaryDayName = "".concat(dayName);
                        if (donHang.TinhTrangDonHang === "Đã giao") {
                            don_hoanthanh7ngay_1[dayDiff] += 1;
                            tongSoDon7ngay_1[dayDiff] += 1;
                        }
                        else if (donHang.TinhTrangDonHang === "Đã hủy") {
                            don_huy7ngay_1[dayDiff] += 1;
                            tongSoDon7ngay_1[dayDiff] += 1;
                        }
                        for (var i = 0; i < dayDiff; i++) {
                            var tt = (0, moment_1.default)(startOfSevenDaysAgo_1).add(i, 'days').format("DD/MM");
                            if (!dayNames_1[i]) {
                                dayNames_1[i] = tt;
                            }
                        }
                        // Nếu mảng dayNames chưa có giá trị tại vị trí dayDiff, gán giá trị vào
                        if (!dayNames_1[dayDiff]) {
                            dayNames_1[dayDiff] = temporaryDayName;
                        }
                    }
                });
                currentDayName = (0, moment_1.default)(currentDate).format("DD/MM");
                if (!dayNames_1.includes(currentDayName)) {
                    dayNames_1.push(currentDayName);
                }
                thongkestore = {
                    don_hoanthanh7ngay: don_hoanthanh7ngay_1,
                    don_huy7ngay: don_huy7ngay_1,
                    tongSoDon7ngay: tongSoDon7ngay_1,
                    dayNames: dayNames_1,
                };
                res.send(thongkestore);
                return [3 /*break*/, 3];
            case 2:
                error_11 = _a.sent();
                console.error(error_11);
                res.status(500).send("Internal Server Error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/thongke_7ngay_DoanhThu_store", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idStore, store_ch, currentDate, startOfSevenDaysAgo_2, don_doanhthu7ngay_1, dayNames_2, currentDayName, thongkestore, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                idStore = req.body.MaCH.MaCH;
                return [4 /*yield*/, order_model_1.DonHangModel.find({ MaCH: idStore })];
            case 1:
                store_ch = _a.sent();
                currentDate = new Date();
                startOfSevenDaysAgo_2 = (0, moment_1.default)(currentDate).subtract(6, 'days').startOf('day').toDate();
                don_doanhthu7ngay_1 = Array(7).fill(0);
                dayNames_2 = Array(7).fill(null);
                store_ch.forEach(function (donHang) {
                    var isAfterStartOfSevenDaysAgo = (0, moment_1.default)(donHang.NgayDat).isAfter(startOfSevenDaysAgo_2);
                    var dayDiff = (0, moment_1.default)(donHang.NgayDat).diff(startOfSevenDaysAgo_2, 'days');
                    if (isAfterStartOfSevenDaysAgo && dayDiff < 7) {
                        var dayName = (0, moment_1.default)(donHang.NgayDat).format("DD/MM"); // Lấy ngày + tháng
                        // Sử dụng biến tạm thời để lưu trữ ngày + tháng
                        var temporaryDayName = "".concat(dayName);
                        if (donHang.TinhTrangDonHang === "Đã giao") {
                            don_doanhthu7ngay_1[dayDiff] += donHang.TongTien;
                        }
                        for (var i = 0; i < dayDiff; i++) {
                            var tt = (0, moment_1.default)(startOfSevenDaysAgo_2).add(i, 'days').format("DD/MM");
                            if (!dayNames_2[i]) {
                                dayNames_2[i] = tt;
                            }
                        }
                        // Nếu mảng dayNames chưa có giá trị tại vị trí dayDiff, gán giá trị vào
                        if (!dayNames_2[dayDiff]) {
                            dayNames_2[dayDiff] = temporaryDayName;
                        }
                    }
                });
                currentDayName = (0, moment_1.default)(currentDate).format("DD/MM");
                if (!dayNames_2.includes(currentDayName)) {
                    dayNames_2.push(currentDayName);
                }
                thongkestore = {
                    don_doanhthu7ngay: don_doanhthu7ngay_1,
                    dayNames: dayNames_2,
                };
                res.send(thongkestore);
                return [3 /*break*/, 3];
            case 2:
                error_12 = _a.sent();
                console.error(error_12);
                res.status(500).send("Internal Server Error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/thongke_Top5_SP_BanChayNhat_store", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idStore, donHangs, productCounts_1, sortedProducts, result, tenSPArray, soLuongArray, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                idStore = req.body.MaCH.MaCH;
                return [4 /*yield*/, order_model_1.DonHangModel.find({ MaCH: idStore, TinhTrangDonHang: "Đã giao" }).populate('ChiTietDonHang.SanPham')];
            case 1:
                donHangs = _a.sent();
                productCounts_1 = {};
                // Lặp qua từng đơn hàng để đếm số lượng sản phẩm
                donHangs.forEach(function (donHang) {
                    donHang.ChiTietDonHang.forEach(function (chiTiet) {
                        var tenSP = chiTiet.SanPham.TenSP;
                        if (!productCounts_1[tenSP]) {
                            productCounts_1[tenSP] = chiTiet.SL;
                        }
                        else {
                            productCounts_1[tenSP] += chiTiet.SL;
                        }
                    });
                });
                sortedProducts = Object.keys(productCounts_1).sort(function (a, b) { return productCounts_1[b] - productCounts_1[a]; }).slice(0, 5);
                result = sortedProducts.map(function (tenSP) { return ({
                    tenSP: tenSP,
                    soLuong: productCounts_1[tenSP]
                }); });
                tenSPArray = result.map(function (item) { return item.tenSP; });
                soLuongArray = result.map(function (item) { return item.soLuong; });
                // Trả về 2 mảng array trong response
                res.send({
                    tenSPArray: tenSPArray,
                    soLuongArray: soLuongArray
                });
                return [3 /*break*/, 3];
            case 2:
                error_13 = _a.sent();
                console.error(error_13);
                res.status(500).send("Internal Server Error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/thongke_Top5_SP_BanE_store", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idStore, donHangs, productCounts_2, sortedProducts, result, tenSPArray, soLuongArray, error_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                idStore = req.body.MaCH.MaCH;
                return [4 /*yield*/, order_model_1.DonHangModel.find({ MaCH: idStore, TinhTrangDonHang: "Đã giao" }).populate('ChiTietDonHang.SanPham')];
            case 1:
                donHangs = _a.sent();
                productCounts_2 = {};
                // Lặp qua từng đơn hàng để đếm số lượng sản phẩm
                donHangs.forEach(function (donHang) {
                    donHang.ChiTietDonHang.forEach(function (chiTiet) {
                        var tenSP = chiTiet.SanPham.TenSP;
                        if (!productCounts_2[tenSP]) {
                            productCounts_2[tenSP] = chiTiet.SL;
                        }
                        else {
                            productCounts_2[tenSP] += chiTiet.SL;
                        }
                    });
                });
                sortedProducts = Object.keys(productCounts_2).sort(function (a, b) { return productCounts_2[a] - productCounts_2[b]; }).slice(0, 5);
                result = sortedProducts.map(function (tenSP) { return ({
                    tenSP: tenSP,
                    soLuong: productCounts_2[tenSP]
                }); });
                tenSPArray = result.map(function (item) { return item.tenSP; });
                soLuongArray = result.map(function (item) { return item.soLuong; });
                // Trả về 2 mảng array trong response
                res.send({
                    tenSPArray: tenSPArray,
                    soLuongArray: soLuongArray
                });
                return [3 /*break*/, 3];
            case 2:
                error_14 = _a.sent();
                console.error(error_14);
                res.status(500).send("Internal Server Error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
