import { Router } from "express";

import asynceHandler from 'express-async-handler';
import { CodeModel } from "../models/code.model";


const router = Router();
router.get("/check",asynceHandler(
    async (req,res)=>{ 
        const productsCount = await CodeModel.countDocuments();
        if(productsCount >0)
        {
            res.send("Get is rfeady");
            return;
        }
        else{
            res.send("Get isnt ready");
            return;
        }
    }

))

router.get("/randomCode/:mail", asynceHandler(async (req, res) => {
    try {
     
    const mail = req.params.mail;
      const randomCode = await processRandomCode();// lấy code

      var nodemailer = require('nodemailer');

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'hoakhuu80@gmail.com',
          pass: 'iuytnsgroogcykvv'  // Hoặc mật khẩu ứng dụng nếu đã kích hoạt xác thực 2 yếu tố
        }
      });
     
      var mailOptions = {
        from: 'hoakhuu80@gmail.com',
        to: mail,
        subject: 'Mở cửa hàng trực tuyến của bạn, chúng tôi lo phần còn lại!',
        text: 'PassCode:' +randomCode +' (Lưu ý không tiết lộ mã này với người khác)'
      };
  
      transporter.sendMail(mailOptions, function (error: Error | null, info: any) {
        if (error) {
          console.log('Error sending email:', error);
          res.status(500).json({ message: 'Error sending email'+error });
        } else {
          console.log('Email sent:', info.response);
          res.status(200).json({ message: 'Email sent successfully' });
        }
      });


      res.send(randomCode)

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }));


  
  const processRandomCode = async () => {
    const count = await CodeModel.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomCode = await CodeModel.findOne().skip(randomIndex);
    return randomCode.code;
  };


  router.get("/checkCode/:passcode", asynceHandler(async (req, res) => {
    const mail = req.params.passcode;

    try {
        const code = await CodeModel.find({ code: mail });

        if (code.length > 0) {
            // Code found, you can handle it accordingly
            res.status(200).json({ success: true, code: code[0] });
        } else {
            // Code not found
            res.status(404).json({ success: false, message: 'Code not found' });
        }
    } catch (error) {
        console.error('Error retrieving code:', error);
        res.status(500).json({ success: false, message: 'Error retrieving code' });
    }
}));

export default router;
