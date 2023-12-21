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
var code_model_1 = require("../models/code.model");
var fs = require('fs').promises;
var router = (0, express_1.Router)();
router.get("/check", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, code_model_1.CodeModel.countDocuments()];
            case 1:
                productsCount = _a.sent();
                if (productsCount > 0) {
                    res.send("Get is rfeady");
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
router.get("/randomCode/:mail", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mail, randomCode, htmlTemplate, nodemailer, transporter, mailOptions, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                mail = req.params.mail;
                return [4 /*yield*/, processRandomCode()];
            case 1:
                randomCode = _a.sent();
                return [4 /*yield*/, fs.readFile('C:/Users/admin/Documents/GitHub/Food-Bevarage-Website/backend/src/routers/comfirm.html', 'utf-8')];
            case 2:
                htmlTemplate = _a.sent();
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
                    to: mail,
                    subject: 'Mở cửa hàng trực tuyến của bạn, chúng tôi lo phần còn lại!',
                    html: htmlTemplate.replace('{{randomCode}}', randomCode)
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
                res.send(randomCode);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error('Error:', error_1);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }));
var processRandomCode = function () { return __awaiter(void 0, void 0, void 0, function () {
    var count, randomIndex, randomCode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, code_model_1.CodeModel.countDocuments()];
            case 1:
                count = _a.sent();
                randomIndex = Math.floor(Math.random() * count);
                return [4 /*yield*/, code_model_1.CodeModel.findOne().skip(randomIndex)];
            case 2:
                randomCode = _a.sent();
                return [2 /*return*/, randomCode.code];
        }
    });
}); };
router.get("/checkCode/:passcode", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mail, code, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mail = req.params.passcode;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, code_model_1.CodeModel.find({ code: mail })];
            case 2:
                code = _a.sent();
                if (code.length > 0) {
                    // Code found, you can handle it accordingly
                    res.status(200).json({ success: true, code: code[0] });
                }
                else {
                    // Code not found
                    res.status(404).json({ success: false, message: 'Code not found' });
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error('Error retrieving code:', error_2);
                res.status(500).json({ success: false, message: 'Error retrieving code' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }));
exports.default = router;
