import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { StoreModel } from "../models/store.model";
import { DonHangModel } from "../models/order.model";
import { ProductModel } from "../models/product.model";


const router = Router();

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

    // Bước 2: Lấy thông tin cửa hàng tương ứng cho mỗi sản phẩm
    const storeIds = sanPhams.map(sp => sp._id.MaCH);
    const storeInfoList = await StoreModel.find({ _id: { $in: storeIds } });

    // Bước 3: Gửi kết quả về client
    res.send(storeInfoList);
  } catch (error) {
    
  }
}));


export default router;