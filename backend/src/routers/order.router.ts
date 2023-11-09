import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { DonHangModel } from "../models/order.model";



const router = Router();

router.get("/check",asynceHandler(
    async (req,res)=>{ 
        const productsCount = await DonHangModel.countDocuments();
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


router.get("/getAll",asynceHandler(
    async (req,res)=>{ 
        const DonHang = await DonHangModel.find().populate('ChiTietDonHang.SanPham');

        res.send(DonHang);
        
     }
))



export default router;
