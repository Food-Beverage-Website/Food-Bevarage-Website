import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { StoreModel } from "../models/store.model";
import { DonHangModel } from "../models/order.model";
import { ProductModel } from "../models/product.model";
import jwt from "jsonwebtoken";

const router = Router();
const nodemailer = require("nodemailer");

router.get("/getStore",asynceHandler(
    async (req,res)=>{ 
        const productsCount = await StoreModel.countDocuments();
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


router.get("/getStorebyId/:idStore",asynceHandler(
  async (req,res)=>{ 
    const idStore = req.params.idStore;
    const store = await StoreModel.findById(idStore); 
    res.send(store);
   }

))


router.post("/register", asynceHandler(async (req, res) => {
  try {
    const { user, password, TenCuaHang, ChuSoHuu ,DiaChi, SDT,CCCD, Gmail } = req.body;

    const defaultCustomer = new StoreModel({
      TaiKhoan:user,
      MatKhau:password,
      TenCuaHang:TenCuaHang,
      ChuSoHuu:ChuSoHuu,
      DiaChi:DiaChi,
      SDT:SDT,
      CCCD:CCCD,
      Gmail:Gmail,
      GioDongCua:"00:00",
      GioMoCua:"00:00",
      ThucDons:[{
        TenThucDon:"Tất cả"
      }]
    });

    // Save the new document to the database
    const savedCustomer = await defaultCustomer.save();

    res.status(201).json(savedCustomer); // Respond with the saved document
  } catch (error) {
    console.error('Lỗi khi thêm cửa hàng:', error);
    res.status(500).json({ message: 'Lỗi khi thêm cửa hàng', error: error });
  }
}));



router.get("/getStorebyname/:namesearch",asynceHandler(
  async (req,res)=>{ 
    const Storename = req.params.namesearch;
    const store = await StoreModel.find({ TenCuaHang: { $regex: Storename, $options: 'i' } })
    res.send(store);
   }

))


router.get("/test/:namesearch",asynceHandler(
  async (req,res)=>{ 
    const Storename = req.params.namesearch;
    const store = await StoreModel.find({'_id':Storename})
    res.send(store);
   }

))


router.patch("/addApplyProduct", asynceHandler(async (req, res) => {
  try {
    const { idMenu, listID = [] }: { idMenu: string, listID: string[] } = req.body;

    const updatedProducts = await Promise.all(listID.map(async (element) => {
      return await ProductModel.findOneAndUpdate(
        { _id: element },
        {
          $set: {
            MaThucDon: idMenu
          }
        },
        { new: true }
      );
    }));

    if (updatedProducts.length > 0) {
      console.log('Thông tin Sản phẩm sau khi cập nhật:', updatedProducts);
      res.status(200).json({ success: true, message: 'Cập nhật Sản phẩm thành công' });
    } else {
      console.error('Không tìm thấy Sản phẩm hoặc có lỗi khi cập nhật.');
      res.status(404).json({ success: false, message: 'Không tìm thấy Sản phẩm hoặc có lỗi khi cập nhật' });
    }
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Lỗi khi cập nhật Sản phẩm:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi cập nhật Sản phẩm' + error });
  }
}));


router.put("/updateThucDon", asynceHandler(async (req, res) => {
  try {
      const { Id,idThucDon,TenThucDon } = req.body;
  
      const updatedThucdon = await StoreModel.findOneAndUpdate(
          { '_id': Id, 'ThucDons._id': idThucDon },
          {
              $set: {
                  'ThucDons.$.TenThucDon': TenThucDon
              },
          },
          { new: true }
      );

      if (updatedThucdon) {
          console.log('Thông tin Thực đơn sau khi cập nhật:', updatedThucdon);
          res.status(200).json({ success: true, message: 'Cập nhật thông tin Thực đơn thành công' });
      } else {
          console.error('Không tìm thấy Thực đơn hoặc có lỗi khi cập nhật.');
          res.status(404).json({ success: false, message: 'Không tìm thấy Thực đơn hoặc có lỗi khi cập nhật.' });
      }
  } catch (error) {
      console.error('Lỗi khi cập nhật Thực đơn:', error);
      res.status(500).json({ success: false, message: 'Lỗi khi cập nhật Thực đơn' + error });
  }
}));


router.post("/deleteThucDon", asynceHandler(async (req, res) => {
  try {
    const { _id, idmenu } = req.body;

    const query = {
      '_id': _id,
    };

    const update = {
      $pull: {
        'ThucDons': {
          _id: idmenu,
        },
      },
    };

    const options = {
      new: true, // Trả về dữ liệu mới sau khi cập nhật
    };

    const updatedThucDons = await StoreModel.findOneAndUpdate(query, update, options);

    // Kiểm tra và xử lý kết quả
    if (updatedThucDons) {
      console.log('Thông tin Topping sau khi xóa:', updatedThucDons);
      res.status(200).json({ success: true, message: 'Xóa Topping thành công' });
    } else {
      console.error('Không tìm thấy Topping hoặc có lỗi khi xóa.');
      res.status(404).json({ success: false, message: 'Không tìm thấy Topping hoặc có lỗi khi xóa' });
    }
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Lỗi khi xóa Topping:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi xóa Topping' + error });
  }
}));




router.get("/top5_store", asynceHandler(
  async (req, res) => {
  try {
    // Bước 1: Lấy danh sách sản phẩm và lọc ra những sản phẩm có số lượng trong đơn hàng khác 0
    const sanPhams = await ProductModel.aggregate([
      {
        $lookup: {
          from: "donhangs",  
          localField: "_id",
          foreignField: "ChiTietDonHang.SanPham",
          as: "donHangs"
        }
      },
      {
        $unwind: "$donHangs"
      },
      {
        $unwind: "$donHangs.ChiTietDonHang"
      },
      {
        $group: {
          _id: {
            _id: "$_id",
            MaCH: "$MaCH",
            TenSP: "$TenSP"
          },
          SoLuongTrongDonHang: {
            $sum: "$donHangs.ChiTietDonHang.SL"
          }
        }
      },
      {
        $match: {
          SoLuongTrongDonHang: { $ne: 0 }
        }
      }
    ]);

    const storeIds = sanPhams.map(sp => sp._id.MaCH);
    const storeInfoList = await StoreModel.find({ _id: { $in: storeIds } });

    res.send(storeInfoList);
  } catch (error) {
    
  }
}));




router.post("/login", asynceHandler(async (req, res) => {
  const { account, password } = req.body;
  const store = await StoreModel.findOne({ TaiKhoan: account, MatKhau: password });
  if (store) {
      res.send(generateTokenResponse(store));
  } else {
      res.status(400).send("Account or password store isn't true");
  }
}));



const generateTokenResponse = (store: any)=> {
  const token = jwt.sign({ Account: store.TaiKhoan}, "keyyyyy",{
      expiresIn:"30d"
  });
  store.token=token
 return store;
};





router.get("/signin", asynceHandler(async (req, res) => {
  const { account, password } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
      user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
      pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
    },
  });

  const message = {
    from: '"Fred Foo 👻" <hoakhuu80@gmail.com>',
    to: "ohshit781@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  };

  transporter.sendMail(message)
    .then(() => {
      return res.status(201).json({ msg: "Kiểm tra gmail của bạn" });
    })
    .catch((error:any) => {
      return res.status(500).json({ msg: error.message });
    });
}));

export default router;