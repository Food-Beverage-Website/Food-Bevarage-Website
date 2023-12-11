import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { TypeModel } from "../models/type.model";
import { ProductModel } from "../models/product.model";


const router = Router();

router.get("/getType",asynceHandler(
    async (req,res)=>{ 
        const productsCount = await TypeModel.countDocuments();
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


router.get("/",asynceHandler( 
    async (req,res)=>{ 
       const products = await TypeModel.find();
       res.send(products);
     }
))



router.get("/getProductbyIdType/:idType",asynceHandler(
    async (req,res)=>{ 
        const idType = req.params.idType;
        const Products = await ProductModel.find({MaTieuMuc:idType});

        res.send(Products);
     }
))



export default router;
