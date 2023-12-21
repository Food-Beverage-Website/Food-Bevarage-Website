"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//server.ts
var dotenv_1 = __importDefault(require("dotenv"));
// Add the correct relative path
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var product_router_1 = __importDefault(require("./routers/product.router"));
var database_config_1 = require("./configs/database.config");
var type_router_1 = __importDefault(require("./routers/type.router"));
var store_router_1 = __importDefault(require("./routers/store.router"));
var menu_router_1 = __importDefault(require("./routers/menu.router"));
var order_router_1 = __importDefault(require("./routers/order.router"));
var buyer_router_1 = __importDefault(require("./routers/buyer.router"));
var payment_router_1 = __importDefault(require("./routers/payment.router"));
var voucher_router_1 = __importDefault(require("./routers/voucher.router"));
var topping_router_1 = __importDefault(require("./routers/topping.router"));
var code_router_1 = __importDefault(require("./routers/code.router"));
var excel_router_1 = __importDefault(require("./routers/excel.router"));
(0, database_config_1.dbConnect)();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:4200"]
}));
app.use("/api/products", product_router_1.default);
app.use("/api/types", type_router_1.default);
app.use("/api/stores", store_router_1.default);
app.use("/api/menus", menu_router_1.default);
app.use("/api/order", order_router_1.default);
app.use("/api/buyer", buyer_router_1.default);
app.use("/api/payment", payment_router_1.default);
app.use("/api/voucher", voucher_router_1.default);
app.use("/api/topping", topping_router_1.default);
app.use("/api/code", code_router_1.default);
app.use("/api/excel", excel_router_1.default);
var port = 5000;
app.listen(port, function () {
    console.log("Website server on http://localhost:" + port);
});
