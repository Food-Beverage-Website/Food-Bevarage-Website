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
var topping_model_1 = require("../models/topping.model");
var mongoose_1 = __importDefault(require("mongoose"));
var router = (0, express_1.Router)();
router.get("/getType", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, topping_model_1.ToppingModel.countDocuments()];
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
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, topping_model_1.ToppingModel.find()];
            case 1:
                products = _a.sent();
                res.send(products);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/getToppingbyIdstore/:idStore", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idStore, listTopping;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idStore = req.params.idStore;
                return [4 /*yield*/, topping_model_1.ToppingModel.find({ MaCH: idStore })];
            case 1:
                listTopping = _a.sent();
                res.send(listTopping);
                return [2 /*return*/];
        }
    });
}); }));
router.post("/getToppingByID", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, IdStore, idtopping, topping, selectedTopping, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, IdStore = _a.IdStore, idtopping = _a.idtopping;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, topping_model_1.ToppingModel.findOne({ MaCH: IdStore, 'Topping._id': idtopping }, { 'Topping.$': 1 } // Projection để lấy mảng con
                    )];
            case 2:
                topping = _b.sent();
                if (!topping) {
                    res.status(404).json({ success: false, message: 'Không tìm thấy Topping' });
                    return [2 /*return*/];
                }
                selectedTopping = topping.Topping[0];
                res.send(selectedTopping);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error('Lỗi khi lấy Topping:', error_1);
                res.status(500).json({ success: false, message: 'Lỗi khi lấy Topping' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }));
router.put("/updateToppingggg", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, IdStore, idtopping, tentopping, gia, hinh, updatedTopping, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, IdStore = _a.IdStore, idtopping = _a.idtopping, tentopping = _a.tentopping, gia = _a.gia, hinh = _a.hinh;
                return [4 /*yield*/, topping_model_1.ToppingModel.findOneAndUpdate({ MaCH: IdStore, 'Topping._id': idtopping }, {
                        $set: {
                            'Topping.$._id': new mongoose_1.default.Types.ObjectId(),
                            'Topping.$.tentopping': tentopping,
                            'Topping.$.hinh': hinh,
                            'Topping.$.gia': gia,
                        },
                    }, { new: true })];
            case 1:
                updatedTopping = _b.sent();
                if (updatedTopping) {
                    console.log('Thông tin Topping sau khi cập nhật:', updatedTopping);
                    res.status(200).json({ success: true, message: 'Cập nhật thông tin Topping thành công' });
                }
                else {
                    console.error('Không tìm thấy Topping hoặc có lỗi khi cập nhật.');
                    res.status(404).json({ success: false, message: 'Không tìm thấy Topping hoặc có lỗi khi cập nhật.' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.error('Lỗi khi cập nhật Topping:', error_2);
                res.status(500).json({ success: false, message: 'Lỗi khi cập nhật Topping' + error_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
router.post("/addNewTopping", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, IdStore, tentopping, gia, hinh, topping, newTopping, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, IdStore = _a.IdStore, tentopping = _a.tentopping, gia = _a.gia, hinh = _a.hinh;
                return [4 /*yield*/, topping_model_1.ToppingModel.findOne({ MaCH: IdStore })];
            case 1:
                topping = _b.sent();
                // Nếu không tìm thấy, khởi tạo mới một Topping với MaCH và mảng Topping rỗng
                if (!topping) {
                    topping = new topping_model_1.ToppingModel({ MaCH: IdStore, Topping: [] });
                }
                newTopping = {
                    _id: new mongoose_1.default.Types.ObjectId(),
                    tentopping: tentopping,
                    gia: gia,
                    hinh: hinh
                };
                // Thêm newTopping vào mảng Topping
                topping.Topping.push(newTopping);
                // Lưu Topping vào cơ sở dữ liệu
                return [4 /*yield*/, topping.save()];
            case 2:
                // Lưu Topping vào cơ sở dữ liệu
                _b.sent();
                res.status(200).json({ message: 'Thêm địa chỉ mới thành công' });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                console.error(error_3);
                res.status(500).json({ message: error_3 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }));
router.post("/deleteTopping", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, IdStore, idtopping, query, update, options, updatedTopping, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, IdStore = _a.IdStore, idtopping = _a.idtopping;
                query = {
                    MaCH: IdStore,
                };
                update = {
                    $pull: {
                        'Topping': {
                            _id: idtopping,
                        },
                    },
                };
                options = {
                    new: true, // Trả về dữ liệu mới sau khi cập nhật
                };
                return [4 /*yield*/, topping_model_1.ToppingModel.findOneAndUpdate(query, update, options)];
            case 1:
                updatedTopping = _b.sent();
                // Kiểm tra và xử lý kết quả
                if (updatedTopping) {
                    console.log('Thông tin Topping sau khi xóa:', updatedTopping);
                    res.status(200).json({ success: true, message: 'Xóa Topping thành công' });
                }
                else {
                    console.error('Không tìm thấy Topping hoặc có lỗi khi xóa.');
                    res.status(404).json({ success: false, message: 'Không tìm thấy Topping hoặc có lỗi khi xóa' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                // Xử lý lỗi nếu có
                console.error('Lỗi khi xóa Topping:', error_4);
                res.status(500).json({ success: false, message: 'Lỗi khi xóa Topping' + error_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
router.get("/getTopping", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var stores, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, topping_model_1.ToppingModel.find()];
            case 1:
                stores = _a.sent();
                res.send(stores);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error('Error fetching stores:', error_5);
                res.status(500).send({ message: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
exports.default = router;
