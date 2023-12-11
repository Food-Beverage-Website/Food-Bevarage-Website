
import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import productRouter from './routers/product.router';
import { dbConnect } from './configs/database.config';
import typeRouter from './routers/type.router';
import storeRouter from './routers/store.router';
import menuRouter from './routers/menu.router';
import orderRouter from './routers/order.router';
import buyerRouter from './routers/buyer.router';
import paymentRouter from './routers/payment.router';
import voucherRouter from './routers/voucher.router';
import toppingRouter from './routers/topping.router';
import codeRouter from './routers/code.router';
dbConnect();
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.use("/api/products", productRouter);
app.use("/api/types", typeRouter);
app.use("/api/stores", storeRouter);
app.use("/api/menus", menuRouter);
app.use("/api/order", orderRouter);
app.use("/api/buyer", buyerRouter);
app.use("/api/payment",paymentRouter);
app.use("/api/voucher", voucherRouter);
app.use("/api/topping", toppingRouter);
app.use("/api/code", codeRouter);



const port = 5000;
app.listen(port, () => {
    console.log("Website server on http://localhost:" + port);
});
