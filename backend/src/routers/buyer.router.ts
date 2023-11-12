import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { BuyerModel } from "../models/buyer.model";
import jwt from "jsonwebtoken";


const router = Router();

router.get("/check1",asynceHandler(
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

router.post("/login", asynceHandler(async (req, res) => {
    const { account, password } = req.body;
    const user = await BuyerModel.findOne({ TaiKhoan: account, MatKhau: password });
    if (user) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(400).send("Account or password isn't true");
    }
}));

const generateTokenResponse = (user: any)=> {
    const token = jwt.sign({ Account: user.TaiKhoan}, "keyyyyy",{
        expiresIn:"30d"
    });
   user.token=token
   return user;
};

export default router;
