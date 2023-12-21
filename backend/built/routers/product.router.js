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
var product_model_1 = require("../models/product.model");
var store_model_1 = require("../models/store.model");
var topping_model_1 = require("../models/topping.model");
var order_model_1 = require("../models/order.model");
var voucher_model_1 = require("../models/voucher.model");
var mongoose = require('mongoose');
var router = (0, express_1.Router)();
router.get("/check", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product_model_1.ProductModel.countDocuments()];
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
router.get("/", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, product_model_1.ProductModel.find()];
            case 1:
                products = _a.sent();
                res.send(products);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
router.get("/getProduct", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsWithStoreInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product_model_1.ProductModel.find().populate('MaCH')];
            case 1:
                productsWithStoreInfo = _a.sent();
                productsWithStoreInfo.sort(function () { return Math.random() - 0.5; });
                res.send(productsWithStoreInfo);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/getProductAll_KVH", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsWithStoreInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product_model_1.ProductModel.find().populate('MaCH')];
            case 1:
                productsWithStoreInfo = _a.sent();
                res.send(productsWithStoreInfo);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/getProductByIdStore/:idStore", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idStore, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idStore = req.params.idStore;
                return [4 /*yield*/, product_model_1.ProductModel.find({ MaCH: idStore })];
            case 1:
                products = _a.sent();
                res.send(products);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/getProductByName/:Searchname", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productName, productsWithStoreInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productName = req.params.Searchname;
                return [4 /*yield*/, product_model_1.ProductModel.find({ TenSP: { $regex: productName, $options: 'i' } }).populate('MaCH')];
            case 1:
                productsWithStoreInfo = _a.sent();
                res.send(productsWithStoreInfo);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/getProductByMenu/:MenuID", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var menuid, productsbyMenu;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                menuid = req.params.MenuID;
                return [4 /*yield*/, product_model_1.ProductModel.find({ MaThucDon: menuid })];
            case 1:
                productsbyMenu = _a.sent();
                res.send(productsbyMenu);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/getProductbyIDProduct/:idSP", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, productsbyMenu;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.idSP;
                return [4 /*yield*/, product_model_1.ProductModel.find({ _id: id })];
            case 1:
                productsbyMenu = _a.sent();
                res.send(productsbyMenu);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/GetAllProductbyName");
router.get("/getProductById/:productId", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, productInfo, storeInfo, toppings, productWithToppings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = req.params.productId;
                return [4 /*yield*/, product_model_1.ProductModel.findById(productId)];
            case 1:
                productInfo = _a.sent();
                if (!!productInfo) return [3 /*break*/, 2];
                throw { status: 404, message: 'Không tìm thấy sản phẩm' };
            case 2: return [4 /*yield*/, store_model_1.StoreModel.findById(productInfo.MaCH)];
            case 3:
                storeInfo = _a.sent();
                if (!storeInfo) return [3 /*break*/, 5];
                return [4 /*yield*/, topping_model_1.ToppingModel.find({ MaCH: storeInfo._id })];
            case 4:
                toppings = _a.sent();
                productWithToppings = {
                    productInfo: productInfo,
                    toppings: toppings,
                };
                res.send(productWithToppings);
                return [2 /*return*/]; // Exit the function after sending the response
            case 5:
                res.send(productInfo);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/getProductById1/:productId", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, productInfo, storeInfo, toppings, productInfo2, _a, _b, danhsachKhuyenMai, _i, productInfo2_1, item, km, productWithToppings;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                productId = req.params.productId;
                return [4 /*yield*/, product_model_1.ProductModel.findById(productId).populate('MaCH')];
            case 1:
                productInfo = _c.sent();
                if (!!productInfo) return [3 /*break*/, 2];
                throw { status: 404, message: 'Không tìm thấy sản phẩm' };
            case 2: return [4 /*yield*/, store_model_1.StoreModel.findById(productInfo.MaCH)];
            case 3:
                storeInfo = _c.sent();
                if (!storeInfo) return [3 /*break*/, 10];
                return [4 /*yield*/, topping_model_1.ToppingModel.find({ MaCH: storeInfo._id })];
            case 4:
                toppings = _c.sent();
                productInfo2 = [];
                _b = (_a = productInfo2).push;
                return [4 /*yield*/, product_model_1.ProductModel.findById(productId).populate('MaCH')];
            case 5:
                _b.apply(_a, [_c.sent()]);
                danhsachKhuyenMai = [];
                _i = 0, productInfo2_1 = productInfo2;
                _c.label = 6;
            case 6:
                if (!(_i < productInfo2_1.length)) return [3 /*break*/, 9];
                item = productInfo2_1[_i];
                return [4 /*yield*/, voucher_model_1.VoucherModel.find({ MaCH: item.MaCH._id, "SanPhams.idsp": item._id })];
            case 7:
                km = _c.sent();
                danhsachKhuyenMai.push(km);
                _c.label = 8;
            case 8:
                _i++;
                return [3 /*break*/, 6];
            case 9:
                productWithToppings = {
                    productInfo: productInfo,
                    toppings: toppings,
                    storeInfo: storeInfo,
                    danhsachKhuyenMai: danhsachKhuyenMai
                };
                res.send(productWithToppings);
                return [2 /*return*/]; // Exit the function after sending the response
            case 10:
                res.send(productInfo);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/getBestSellerProductbystore/:storeid", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var storeId, idSanPham, productIds, sanpham;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                storeId = req.params.storeid;
                return [4 /*yield*/, order_model_1.DonHangModel.aggregate([
                        { $unwind: "$ChiTietDonHang" },
                        { $group: { _id: "$ChiTietDonHang.SanPham", totalSold: { $sum: "$ChiTietDonHang.SL" } } },
                    ])];
            case 1:
                idSanPham = _a.sent();
                productIds = idSanPham.map(function (product) { return product._id; });
                return [4 /*yield*/, product_model_1.ProductModel.find({ _id: { $in: productIds }, MaCH: storeId })];
            case 2:
                sanpham = _a.sent();
                res.send(sanpham);
                return [2 /*return*/];
        }
    });
}); }));
router.post("/addNewProduct", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, TenSP, MieuTa, Hinh, NgayDang, TinhTrang, MaCH, MaThucDon, MaTieuMuc, DonGia, newProduct;
    return __generator(this, function (_b) {
        _a = req.body, TenSP = _a.TenSP, MieuTa = _a.MieuTa, Hinh = _a.Hinh, NgayDang = _a.NgayDang, TinhTrang = _a.TinhTrang, MaCH = _a.MaCH, MaThucDon = _a.MaThucDon, MaTieuMuc = _a.MaTieuMuc, DonGia = _a.DonGia;
        newProduct = new product_model_1.ProductModel({
            _id: new mongoose.Types.ObjectId(),
            TenSP: TenSP,
            MieuTa: MieuTa,
            Hinh: Hinh,
            NgayDang: NgayDang,
            TinhTrang: TinhTrang,
            MaCH: MaCH,
            MaThucDon: MaThucDon,
            MaTieuMuc: MaTieuMuc,
            DonGia: DonGia,
            DanhGia: []
        });
        newProduct.save()
            .then(function (savedProduct) {
            console.log('Đã thêm sản phẩm thành công:', savedProduct);
            res.status(201).json(savedProduct); // Trả về thông tin sản phẩm đã thêm
        })
            .catch(function (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
            res.status(500).send('Lỗi khi thêm sản phẩm' + error);
        });
        return [2 /*return*/];
    });
}); }));
router.patch("/updateProduct", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _id, TenSP, MieuTa, Hinh, TinhTrang, MaThucDon, MaTieuMuc, DonGia, updatedProduct;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, _id = _a._id, TenSP = _a.TenSP, MieuTa = _a.MieuTa, Hinh = _a.Hinh, TinhTrang = _a.TinhTrang, MaThucDon = _a.MaThucDon, MaTieuMuc = _a.MaTieuMuc, DonGia = _a.DonGia;
                return [4 /*yield*/, product_model_1.ProductModel.findOneAndUpdate({ _id: _id }, {
                        $set: {
                            TenSP: TenSP,
                            MieuTa: MieuTa,
                            Hinh: Hinh,
                            TinhTrang: TinhTrang,
                            MaThucDon: MaThucDon,
                            MaTieuMuc: MaTieuMuc,
                            DonGia: DonGia,
                        }
                    }, { new: true })];
            case 1:
                updatedProduct = _b.sent();
                if (updatedProduct) {
                    console.log('Đã cập nhật sản phẩm thành công:', updatedProduct);
                    res.status(200).json(updatedProduct);
                }
                else {
                    console.error('Không tìm thấy sản phẩm để cập nhật hoặc có lỗi khi cập nhật');
                    res.status(404).send('Không tìm thấy sản phẩm để cập nhật hoặc có lỗi khi cập nhật');
                }
                return [2 /*return*/];
        }
    });
}); }));
router.delete("/deleteProduct/:idProduct", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, deletedProduct, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params.idProduct;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, product_model_1.ProductModel.findOneAndDelete({ _id: _id })];
            case 2:
                deletedProduct = _a.sent();
                if (deletedProduct) {
                    console.log('Đã xóa sản phẩm thành công:', deletedProduct);
                    res.status(200).json(deletedProduct);
                }
                else {
                    console.error('Không tìm thấy sản phẩm để xóa hoặc có lỗi khi xóa');
                    res.status(404).send('Không tìm thấy sản phẩm để xóa hoặc có lỗi khi xóa');
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error('Lỗi khi xóa sản phẩm:', error_2);
                res.status(500).send('Lỗi khi xóa sản phẩm');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }));
router.get("/getNewProducts", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var endDate, newProducts, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                endDate = new Date();
                endDate.setDate(endDate.getDate() - 7);
                return [4 /*yield*/, product_model_1.ProductModel.find({
                        NgayDang: {
                            $gte: formatDate(endDate),
                            $lte: formatDate(new Date()),
                        },
                    })];
            case 1:
                newProducts = _a.sent();
                console.log(newProducts);
                res.send(newProducts);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).send({ error: 'Internal Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1; // Months are zero-based
    var year = date.getFullYear();
    // Ensure leading zeros
    var formattedDate = "".concat(day < 10 ? '0' : '').concat(day, "/").concat(month < 10 ? '0' : '').concat(month, "/").concat(year);
    return formattedDate;
}
router.get('/top25_products', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var topSellingProducts, topSellingProductsDetails, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, order_model_1.DonHangModel.aggregate([
                        { $unwind: '$ChiTietDonHang' },
                        {
                            $group: {
                                _id: '$ChiTietDonHang.SanPham',
                                SoLuongBan: { $sum: '$ChiTietDonHang.SL' },
                            },
                        },
                        { $sort: { SoLuongBan: -1 } },
                        { $limit: 25 },
                    ])];
            case 1:
                topSellingProducts = _a.sent();
                return [4 /*yield*/, product_model_1.ProductModel.populate(topSellingProducts, { path: '_id' })];
            case 2:
                topSellingProductsDetails = _a.sent();
                // Respond with the top-selling products within orders
                res.send(topSellingProductsDetails);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                // Handle errors
                console.error(error_4);
                res.status(500).json({ error: 'Internal Server Error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
