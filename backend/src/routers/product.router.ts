import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { ProductModel } from "../models/product.model";

const router = Router();

router.get("/getProduct",asynceHandler(
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


router.get("/", (req, res) => {
    res.send("Hello world nè");
});

export default router;
