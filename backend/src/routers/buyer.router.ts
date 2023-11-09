import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { BuyerModel } from "../models/buyer.model";



const router = Router();

router.get("/check",asynceHandler(
    async (req,res)=>{ 
        const productsCount = await BuyerModel.countDocuments();
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

export default router;
