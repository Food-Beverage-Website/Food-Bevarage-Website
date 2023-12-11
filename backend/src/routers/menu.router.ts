import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { MenuModel } from "../models/menu.model";
import { StoreModel } from "../models/store.model";


const router = Router();

router.get("/check",asynceHandler(
    async (req,res)=>{ 
        const productsCount = await MenuModel.countDocuments();
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
