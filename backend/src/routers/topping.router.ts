import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { ToppingModel } from "../models/topping.model";


const router = Router();

router.get("/getType",asynceHandler(
    async (req,res)=>{ 
        const productsCount = await ToppingModel.countDocuments();
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
       const products = await ToppingModel.find();
       res.send(products);
     }
))




export default router;
