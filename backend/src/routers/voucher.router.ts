import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { VoucherModel } from "../models/voucher.model";



const router = Router();

router.get("/getType",asynceHandler(
    async (req,res)=>{ 
        const productsCount = await VoucherModel.countDocuments();
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
       const products = await VoucherModel.find();
       res.send(products);
     }
))




export default router;
