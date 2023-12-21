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
var buyer_model_1 = require("../models/buyer.model");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var topping_model_1 = require("../models/topping.model");
var product_model_1 = require("../models/product.model");
var mongoose_1 = __importDefault(require("mongoose"));
var router = (0, express_1.Router)();
router.get("/check", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, buyer_model_1.BuyerModel.countDocuments()];
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
router.post("/addAddress", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, idKhachHang, TenNhanHang, DiaChi, SDT, user, newAddress, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, idKhachHang = _a.idKhachHang, TenNhanHang = _a.TenNhanHang, DiaChi = _a.DiaChi, SDT = _a.SDT;
                return [4 /*yield*/, buyer_model_1.BuyerModel.findOne({ _id: idKhachHang })];
            case 1:
                user = _b.sent();
                newAddress = {
                    TenNhanHang: TenNhanHang,
                    DiaChi: DiaChi,
                    SDT: SDT
                };
                user.DiaChis.push(newAddress);
                return [4 /*yield*/, user.save()];
            case 2:
                _b.sent();
                res.status(200).json({ message: 'Thêm địa chỉ mới thành công' });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error(error_1);
                res.status(500).json({ message: error_1 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }));
router.get("/delAddress/:idKhachHang/:idDiaChi", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idKhachHang, idDiaChi, user, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                idKhachHang = req.params.idKhachHang;
                idDiaChi = req.params.idDiaChi;
                return [4 /*yield*/, buyer_model_1.BuyerModel.findOne({ _id: idKhachHang })];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, user.updateOne({ $pull: { DiaChis: { _id: idDiaChi } } })];
            case 2:
                result = _a.sent();
                if (result.nModified > 0) {
                    res.status(200).json({ message: "Xóa thành công" });
                }
                else {
                    res.status(404).json({ message: "Không tìm thấy địa chỉ để xóa." });
                }
                return [3 /*break*/, 4];
            case 3:
                res.status(404).json({ message: "Người dùng không tồn tại." });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).json({ message: error_2 });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); }));
router.get("/getBuyerByID/:idKhachHang", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idKhachHang, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                idKhachHang = req.params.idKhachHang;
                return [4 /*yield*/, buyer_model_1.BuyerModel.findOne({ _id: idKhachHang })];
            case 1:
                user = _a.sent();
                res.send(user);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).json({ message: error_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
router.get("/signin", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nodemailer, transporter, mailOptions;
    return __generator(this, function (_a) {
        try {
            nodemailer = require('nodemailer');
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'hoakhuu80@gmail.com',
                    pass: 'iuytnsgroogcykvv' // Hoặc mật khẩu ứng dụng nếu đã kích hoạt xác thực 2 yếu tố
                }
            });
            mailOptions = {
                from: 'hoakhuu80@gmail.com',
                to: 'ohshit781@gmail.com',
                subject: 'Sending Email using Node.js',
                text: 'That was easy!'
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('Error sending email:', error);
                    res.status(500).json({ message: 'Error sending email' + error });
                }
                else {
                    console.log('Email sent:', info.response);
                    res.status(200).json({ message: 'Email sent successfully' });
                }
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: error });
        }
        return [2 /*return*/];
    });
}); }));
router.post("/register", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user, password, TenKhachHang, DiaChi, SDT, Gmail, defaultCustomer, savedCustomer, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, user = _a.user, password = _a.password, TenKhachHang = _a.TenKhachHang, DiaChi = _a.DiaChi, SDT = _a.SDT, Gmail = _a.Gmail;
                defaultCustomer = new buyer_model_1.BuyerModel({
                    _id: new mongoose_1.default.Types.ObjectId(),
                    TenKhachHang: TenKhachHang,
                    SDT: SDT,
                    DiaChi: DiaChi,
                    MatKhau: password,
                    TaiKhoan: user,
                    TichDiem: 0,
                    Gmail: Gmail,
                    GioHang: [],
                    DiaChis: [],
                });
                return [4 /*yield*/, defaultCustomer.save()];
            case 1:
                savedCustomer = _b.sent();
                res.status(201).json(savedCustomer); // Respond with the saved document
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                console.error('Lỗi khi thêm khách hàng:', error_4);
                res.status(500).json({ message: 'Lỗi khi thêm khách hàng', error: error_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
router.post("/login", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, account, password, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, account = _a.account, password = _a.password;
                return [4 /*yield*/, buyer_model_1.BuyerModel.findOne({ TaiKhoan: account, MatKhau: password })];
            case 1:
                user = _b.sent();
                if (user) {
                    res.send(generateTokenResponse(user));
                }
                else {
                    res.status(400).send("Account or password isn't true");
                }
                return [2 /*return*/];
        }
    });
}); }));
var generateTokenResponse = function (user) {
    var token = jsonwebtoken_1.default.sign({ Account: user.TaiKhoan }, "keyyyyy", {
        expiresIn: "30d"
    });
    user.token = token;
    return user;
};
router.post("/themGioHang", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productJson_1, buyerId, buyer_1, existingProductIndex_1, tonggiamoi, updatedProduct, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                productJson_1 = req.body.productJson;
                console.log('Received product JSON:', productJson_1);
                buyerId = productJson_1.idUser;
                return [4 /*yield*/, buyer_model_1.BuyerModel.findById(buyerId).lean()];
            case 1:
                buyer_1 = _a.sent();
                if (!buyer_1) {
                    // Nếu không tìm thấy người mua, trả về lỗi
                    throw { status: 404, message: 'Không tìm thấy thông tin người mua' };
                }
                existingProductIndex_1 = buyer_1.GioHang.findIndex(function (item) {
                    var _a;
                    return item.MaSP == ((_a = productJson_1.MaSP) === null || _a === void 0 ? void 0 : _a.$oid) && item.DonGiaSizeLy.Size === productJson_1.DonGiaSizeLy.Size;
                });
                if (existingProductIndex_1 !== -1) {
                    // Nếu sản phẩm đã tồn tại, tăng số lượng
                    buyer_1.GioHang[existingProductIndex_1].DonGiaSizeLy.SL += productJson_1.DonGiaSizeLy.SL;
                    tonggiamoi = productJson_1.DonGiaSizeLy.SL * productJson_1.DonGiaSizeLy.Dongia;
                    buyer_1.GioHang[existingProductIndex_1].ThanhTien += tonggiamoi;
                    // Kiểm tra và thêm toppings vào sản phẩm nếu chưa tồn tại
                    productJson_1.DongiaToppings.forEach(function (newTopping) {
                        var existingToppingIndex = buyer_1.GioHang[existingProductIndex_1].DongiaToppings.findIndex(function (existingTopping) {
                            return existingTopping._id == newTopping._id;
                        });
                        if (existingToppingIndex !== -1) {
                            buyer_1.GioHang[existingProductIndex_1].DongiaToppings[existingToppingIndex].soluongtopping += newTopping.soluongtopping;
                            // Nếu Topping đã tồn tại, tăng số lượng, giá và tổng giá Topping
                            buyer_1.GioHang[existingProductIndex_1].DongiaToppings[existingToppingIndex].giatopping += newTopping.giatopping;
                            buyer_1.GioHang[existingProductIndex_1].ThanhTien += newTopping.giatopping * newTopping.soluongtopping;
                        }
                        else {
                            // Nếu Topping chưa tồn tại, thêm mới vào sản phẩm
                            buyer_1.GioHang[existingProductIndex_1].DongiaToppings.push(newTopping);
                            buyer_1.GioHang[existingProductIndex_1].ThanhTien += newTopping.giatopping * newTopping.soluongtopping;
                        }
                    });
                    // Cập nhật thời gian thêm giỏ hàng
                    buyer_1.GioHang[existingProductIndex_1].ThoiGianThemGH = productJson_1.ThoiGianThemGH;
                    updatedProduct = buyer_1.GioHang.splice(existingProductIndex_1, 1)[0];
                    buyer_1.GioHang.unshift(updatedProduct);
                }
                else {
                    // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
                    buyer_1.GioHang.unshift({
                        MaSP: productJson_1.MaSP.$oid,
                        ThoiGianThemGH: productJson_1.ThoiGianThemGH,
                        DonGiaSizeLy: productJson_1.DonGiaSizeLy,
                        DongiaToppings: productJson_1.DongiaToppings,
                        ThanhTien: productJson_1.ThanhTien,
                        GhiChu: productJson_1.GhiChu,
                    });
                }
                // Cập nhật thông tin người mua trong cơ sở dữ liệu
                return [4 /*yield*/, buyer_model_1.BuyerModel.findByIdAndUpdate(buyerId, { GioHang: buyer_1.GioHang })];
            case 2:
                // Cập nhật thông tin người mua trong cơ sở dữ liệu
                _a.sent();
                // Trả về một đối tượng JSON và đặt Content-Type header
                res.status(200).json({ message: 'Product added to the cart successfully', buyer: buyer_1, existingProductIndex: existingProductIndex_1 });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.error('Error processing product JSON:', error_5);
                res.status(500).json({ error: 'Internal Server Error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }));
router.post("/loadGioHang", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var buyerId, buyer1, _loop_1, _i, _a, gioHangItem, buyer, _b, _c, gioHangItem, _loop_2, _d, _e, toppingItem, groupedProducts_1, sortedGroups, error_6;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 13, , 14]);
                buyerId = req.body.idKhachHang;
                if (!buyerId) {
                    // Nếu không tìm thấy người mua, trả về lỗi
                    res.status(500).json({ error: 'lỗi id khách hàng' });
                }
                return [4 /*yield*/, buyer_model_1.BuyerModel.findById(buyerId)];
            case 1:
                buyer1 = _f.sent();
                _loop_1 = function (gioHangItem) {
                    var product, sizeInfo, thanhtienmoi;
                    return __generator(this, function (_g) {
                        switch (_g.label) {
                            case 0: return [4 /*yield*/, product_model_1.ProductModel.findById(gioHangItem.MaSP._id)];
                            case 1:
                                product = _g.sent();
                                if (!!product) return [3 /*break*/, 3];
                                // Nếu không tìm thấy sản phẩm, xóa nó khỏi giỏ hàng và cơ sở dữ liệu
                                return [4 /*yield*/, buyer_model_1.BuyerModel.findByIdAndUpdate(buyerId, { $pull: { "GioHang": { MaSP: gioHangItem.MaSP._id } } })];
                            case 2:
                                // Nếu không tìm thấy sản phẩm, xóa nó khỏi giỏ hàng và cơ sở dữ liệu
                                _g.sent();
                                return [3 /*break*/, 7];
                            case 3:
                                sizeInfo = product.DonGia.find(function (size) { return size.Size === gioHangItem.DonGiaSizeLy.Size; });
                                if (!!sizeInfo) return [3 /*break*/, 5];
                                // Nếu không tìm thấy size, xóa sản phẩm khỏi giỏ hàng và cơ sở dữ liệu
                                return [4 /*yield*/, buyer_model_1.BuyerModel.findByIdAndUpdate(buyerId, {
                                        $pull: {
                                            "GioHang": {
                                                $and: [
                                                    { "MaSP": gioHangItem.MaSP._id },
                                                    { "DonGiaSizeLy.Size": gioHangItem.DonGiaSizeLy.Size }
                                                ]
                                            }
                                        }
                                    })];
                            case 4:
                                // Nếu không tìm thấy size, xóa sản phẩm khỏi giỏ hàng và cơ sở dữ liệu
                                _g.sent();
                                return [3 /*break*/, 7];
                            case 5:
                                console.log(gioHangItem.DonGiaSizeLy.Size, sizeInfo.Gia);
                                thanhtienmoi = gioHangItem.ThanhTien + (gioHangItem.DonGiaSizeLy.SL * sizeInfo.Gia) - (gioHangItem.DonGiaSizeLy.SL * gioHangItem.DonGiaSizeLy.Dongia);
                                return [4 /*yield*/, buyer_model_1.BuyerModel.findByIdAndUpdate(buyerId, {
                                        $set: {
                                            "GioHang.$[element].DonGiaSizeLy.Dongia": sizeInfo.Gia,
                                            "GioHang.$[element].ThanhTien": thanhtienmoi
                                        }
                                    }, { arrayFilters: [{ "element.MaSP": gioHangItem.MaSP._id, "element.DonGiaSizeLy.Size": gioHangItem.DonGiaSizeLy.Size }] })];
                            case 6:
                                _g.sent();
                                _g.label = 7;
                            case 7: return [2 /*return*/];
                        }
                    });
                };
                _i = 0, _a = buyer1.GioHang;
                _f.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                gioHangItem = _a[_i];
                return [5 /*yield**/, _loop_1(gioHangItem)];
            case 3:
                _f.sent();
                _f.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [4 /*yield*/, buyer_model_1.BuyerModel.findById(buyerId)
                    .populate({
                    path: 'GioHang.MaSP',
                    populate: {
                        path: 'MaCH',
                        model: 'cuahang' // Thay 'Cuahang' bằng tên chính xác của collection CuaHang
                    }
                })
                    .lean()];
            case 6:
                buyer = _f.sent();
                if (!buyer) {
                    // Nếu không tìm thấy người mua, trả về lỗi
                    res.status(500).json({ error: 'Không tìm thấy người dùng' });
                }
                _b = 0, _c = buyer.GioHang;
                _f.label = 7;
            case 7:
                if (!(_b < _c.length)) return [3 /*break*/, 12];
                gioHangItem = _c[_b];
                _loop_2 = function (toppingItem) {
                    var topping, foundToppingInfo;
                    return __generator(this, function (_h) {
                        switch (_h.label) {
                            case 0: return [4 /*yield*/, topping_model_1.ToppingModel.findOne({
                                    "MaCH": gioHangItem.MaSP.MaCH._id,
                                    "Topping._id": toppingItem._id
                                })];
                            case 1:
                                topping = _h.sent();
                                if (!topping) return [3 /*break*/, 5];
                                foundToppingInfo = topping.Topping.find(function (toppingInfo) { return toppingInfo._id.toString() === toppingItem._id.toString(); });
                                if (!foundToppingInfo) return [3 /*break*/, 2];
                                gioHangItem.ThanhTien = gioHangItem.ThanhTien + ((foundToppingInfo.gia * toppingItem.soluongtopping) - (toppingItem.giatopping * toppingItem.soluongtopping));
                                toppingItem.giatopping = foundToppingInfo.gia;
                                return [3 /*break*/, 4];
                            case 2: 
                            // Nếu không tìm thấy thông tin topping, xóa nó khỏi giỏ hàng và cơ sở dữ liệu
                            return [4 /*yield*/, buyer_model_1.BuyerModel.findByIdAndUpdate(buyerId, {
                                    $pull: {
                                        "GioHang.$[].DongiaToppings": {
                                            "_id": toppingItem._id
                                        }
                                    }
                                })];
                            case 3:
                                // Nếu không tìm thấy thông tin topping, xóa nó khỏi giỏ hàng và cơ sở dữ liệu
                                _h.sent();
                                _h.label = 4;
                            case 4: return [3 /*break*/, 7];
                            case 5: 
                            // Nếu không tìm thấy topping, xóa nó khỏi giỏ hàng và cơ sở dữ liệu
                            // Bên trong khối else khi bạn muốn xóa toppingItem từ mảng
                            return [4 /*yield*/, buyer_model_1.BuyerModel.findByIdAndUpdate(buyerId, {
                                    $pull: {
                                        "GioHang.$[].DongiaToppings": {
                                            "_id": toppingItem._id
                                        }
                                    }
                                })];
                            case 6:
                                // Nếu không tìm thấy topping, xóa nó khỏi giỏ hàng và cơ sở dữ liệu
                                // Bên trong khối else khi bạn muốn xóa toppingItem từ mảng
                                _h.sent();
                                _h.label = 7;
                            case 7: return [2 /*return*/];
                        }
                    });
                };
                _d = 0, _e = gioHangItem.DongiaToppings;
                _f.label = 8;
            case 8:
                if (!(_d < _e.length)) return [3 /*break*/, 11];
                toppingItem = _e[_d];
                return [5 /*yield**/, _loop_2(toppingItem)];
            case 9:
                _f.sent();
                _f.label = 10;
            case 10:
                _d++;
                return [3 /*break*/, 8];
            case 11:
                _b++;
                return [3 /*break*/, 7];
            case 12:
                // Thực hiện lọc nhóm
                if (buyer && buyer.GioHang && buyer.GioHang.length > 1) {
                    groupedProducts_1 = {};
                    buyer.GioHang.forEach(function (product) {
                        var storeId = product.MaSP.MaCH._id.toString();
                        if (!groupedProducts_1[storeId]) {
                            groupedProducts_1[storeId] = [];
                        }
                        groupedProducts_1[storeId].push(product);
                    });
                    sortedGroups = Object.values(groupedProducts_1).sort(function (groupA, groupB) {
                        var minIndexA = Math.min.apply(Math, groupA.map(function (item) { return item.index || 0; }));
                        var minIndexB = Math.min.apply(Math, groupB.map(function (item) { return item.index || 0; }));
                        return minIndexA - minIndexB;
                    });
                    // Bước 3: Gán lại mảng sản phẩm đã được sắp xếp
                    buyer.GioHang = [].concat.apply([], sortedGroups);
                }
                // Gửi thông tin giỏ hàng của người mua trong res.send
                res.send(buyer);
                return [3 /*break*/, 14];
            case 13:
                error_6 = _f.sent();
                res.status(500).json({ error: 'Lỗi load giỏ hàng' });
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); }));
router.post("/xoa1SanPhamGioHang", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productGioHangJson, buyerId, buyer, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productGioHangJson = req.body.productGioHangJson;
                buyerId = req.body.productGioHangJson.idKhachHang;
                if (!buyerId) {
                    // Nếu không tìm thấy người mua, trả về lỗi
                    res.status(500).json({ error: 'lỗi id khách hàng' });
                }
                return [4 /*yield*/, buyer_model_1.BuyerModel.findById(buyerId)];
            case 1:
                buyer = _a.sent();
                if (!buyer) {
                    // Nếu không tìm thấy người mua, trả về lỗi
                    res.status(500).json({ error: 'Không tìm thấy người dùng' });
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, buyer_model_1.BuyerModel.findByIdAndUpdate(buyerId, {
                        $pull: {
                            "GioHang": {
                                $and: [
                                    { "MaSP": productGioHangJson.MaSP._id },
                                    { "DonGiaSizeLy.Size": productGioHangJson.DonGiaSizeLy.Size }
                                ]
                            }
                        }
                    })];
            case 3:
                _a.sent();
                res.send(buyer);
                return [3 /*break*/, 5];
            case 4:
                error_7 = _a.sent();
                res.status(121).json({ error: 'Lỗi xóa sản phẩm giỏ hàng' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); }));
router.post("/sua1SanPhamGioHang", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productGioHangJson, buyerId, buyer, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productGioHangJson = req.body.productGioHangJson;
                buyerId = req.body.productGioHangJson.idKhachHang;
                if (!buyerId) {
                    // Nếu không tìm thấy người mua, trả về lỗi
                    res.status(500).json({ error: 'lỗi id khách hàng' });
                }
                return [4 /*yield*/, buyer_model_1.BuyerModel.findById(buyerId)];
            case 1:
                buyer = _a.sent();
                if (!buyer) {
                    // Nếu không tìm thấy người mua, trả về lỗi
                    res.status(500).json({ error: 'Không tìm thấy người dùng' });
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, buyer_model_1.BuyerModel.findOneAndUpdate({
                        "GioHang.MaSP": productGioHangJson.MaSP._id,
                        "GioHang.DonGiaSizeLy.Size": productGioHangJson.DonGiaSizeLy.Size
                    }, { $set: { "GioHang.$.DonGiaSizeLy.SL": productGioHangJson.DonGiaSizeLy.SL } }, { new: true } // Trả về giá trị mới sau khi cập nhật
                    )];
            case 3:
                _a.sent();
                res.send(buyer);
                return [3 /*break*/, 5];
            case 4:
                error_8 = _a.sent();
                res.status(121).json({ error: 'Lỗi sửa sản phẩm giỏ hàng' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); }));
router.post("/sua1ToppingSanPhamGioHang", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productGioHangJson, buyerId, idTopping, sltopping, buyer, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productGioHangJson = req.body.productGioHangJson;
                buyerId = req.body.productGioHangJson.idKhachHang;
                idTopping = req.body.productGioHangJson.idTopping;
                sltopping = req.body.productGioHangJson.sltopping;
                if (!buyerId) {
                    // Nếu không tìm thấy người mua, trả về lỗi
                    res.status(500).json({ error: 'lỗi id khách hàng' });
                }
                return [4 /*yield*/, buyer_model_1.BuyerModel.findById(buyerId)];
            case 1:
                buyer = _a.sent();
                if (!buyer) {
                    // Nếu không tìm thấy người mua, trả về lỗi
                    res.status(500).json({ error: 'Không tìm thấy người dùng' });
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, buyer_model_1.BuyerModel.findOneAndUpdate({
                        "GioHang.MaSP": productGioHangJson.MaSP._id,
                        "GioHang.DonGiaSizeLy.Size": productGioHangJson.DonGiaSizeLy.Size,
                        "GioHang.DongiaToppings._id": idTopping
                    }, {
                        $set: {
                            "GioHang.$[outer].DongiaToppings.$[inner].soluongtopping": sltopping
                        }
                    }, {
                        arrayFilters: [
                            { "outer.MaSP": productGioHangJson.MaSP._id },
                            { "inner._id": idTopping }
                        ],
                        new: true
                    })];
            case 3:
                _a.sent();
                res.send(buyer);
                return [3 /*break*/, 5];
            case 4:
                error_9 = _a.sent();
                res.status(121).json({ error: 'Lỗi sửa topping giỏ hàng' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); }));
router.post("/xoa1ToppingGioHang", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productGioHangJson, buyerId, idTopping, buyer, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productGioHangJson = req.body.productGioHangJson;
                buyerId = req.body.productGioHangJson.idKhachHang;
                idTopping = req.body.productGioHangJson.idTopping;
                if (!buyerId) {
                    // Nếu không tìm thấy người mua, trả về lỗi
                    res.status(500).json({ error: 'lỗi id khách hàng' });
                }
                return [4 /*yield*/, buyer_model_1.BuyerModel.findById(buyerId)];
            case 1:
                buyer = _a.sent();
                if (!buyer) {
                    // Nếu không tìm thấy người mua, trả về lỗi
                    res.status(500).json({ error: 'Không tìm thấy người dùng' });
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, buyer_model_1.BuyerModel.findOneAndUpdate({
                        "GioHang.MaSP": productGioHangJson.MaSP._id,
                        "GioHang.DonGiaSizeLy.Size": productGioHangJson.DonGiaSizeLy.Size,
                    }, {
                        $pull: {
                            "GioHang.$.DongiaToppings": { "_id": idTopping }
                        }
                    }, {
                        new: true
                    })];
            case 3:
                _a.sent();
                res.send(buyer);
                return [3 /*break*/, 5];
            case 4:
                error_10 = _a.sent();
                res.status(121).json({ error: 'Lỗi xóa sản phẩm giỏ hàng' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); }));
exports.default = router;
