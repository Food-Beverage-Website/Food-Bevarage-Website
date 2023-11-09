import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { PaymentModel } from "../models/payment.model";



const router = Router();

router.get("/check",asynceHandler(
    async (req,res)=>{ 
        const productsCount = await PaymentModel.countDocuments();
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
        const Payment = await PaymentModel.find();
       
        res.send(Payment);
     }
))


export default router;