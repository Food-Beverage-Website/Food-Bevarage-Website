import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { ProductModel } from "../models/product.model";
import { StoreModel } from "../models/store.model";
import { ToppingModel } from "../models/topping.model";
import { VoucherModel } from "../models/voucher.model";

const mongoose = require('mongoose');

const router = Router();

router.get("/check", asynceHandler(
    async (req, res) => {
        const productsCount = await ProductModel.countDocuments();
        if (productsCount > 0) {
            res.send("Get is ready");
            return;
        }
        else {
            res.send("Get isnt ready");
            return;
        }
    }

))






router.get("/", asynceHandler(async (req, res) => {
    try {
        const products = await ProductModel.find(); // Loại bỏ trường 'id'
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}))


router.get("/getProduct", asynceHandler(async (req, res) => {

    const productsWithStoreInfo = await ProductModel.find().populate('MaCH');
    productsWithStoreInfo.sort(() => Math.random() - 0.5);

    res.send(productsWithStoreInfo);

}));



router.get("/getProductByName/:Searchname", asynceHandler(async (req, res) => {
    const productName = req.params.Searchname;
    const productsWithStoreInfo = await ProductModel.find({ TenSP: { $regex: productName, $options: 'i' } }).populate('MaCH');
    res.send(productsWithStoreInfo);
}));

router.get("/GetAllProductbyName")



router.get("/getProductById/:productId", asynceHandler(async (req, res) => {
    const productId = req.params.productId;

    const productInfo = await ProductModel.findById(productId).populate('MaCH');

    // Kiểm tra xem sản phẩm có tồn tại hay không
    if (!productInfo) {
        throw { status: 404, message: 'Không tìm thấy sản phẩm' };
    } else {
        const storeInfo = await StoreModel.findById(productInfo.MaCH);

        if (storeInfo) {
            const toppings = await ToppingModel.find({ MaCH: storeInfo._id });

            let productInfo2: any[] = [];
            productInfo2.push(await ProductModel.findById(productId).populate('MaCH'));

            let danhsachKhuyenMai: any[] = [];

            for (const item of productInfo2) {

                let km = await VoucherModel.find({ MaCH: item.MaCH._id, "SanPhams.idsp": item._id });
                danhsachKhuyenMai.push(km);
            }

            const productWithToppings = {
                productInfo,
                toppings,
                storeInfo,
                danhsachKhuyenMai
            };
            res.send(productWithToppings);
            return; // Exit the function after sending the response
        }
    }

    res.send(productInfo);
}));

// Trong file server của bạn





export default router;
