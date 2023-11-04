
import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import productRouter from './routers/product.router';
import { dbConnect } from './configs/database.config';
import typeRouter from './routers/type.router';
dbConnect();
const app = express();
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.use("/api/products", productRouter);
app.use("/api/types", typeRouter);


const port = 5000;
app.listen(port, () => {
    console.log("Website server on http://localhost:" + port);
});
