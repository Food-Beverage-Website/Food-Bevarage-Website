import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { ProductModel } from "../models/product.model";

const router = Router();

router.get("/check",asynceHandler(
    async (req,res)=>{ 
        const productsCount = await ProductModel.countDocuments();
        if(productsCount >0)
        {
            res.send("Get is ready");
            return;
        }
        else{
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


export default router;
