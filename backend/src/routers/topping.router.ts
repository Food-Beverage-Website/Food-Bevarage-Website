import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { ToppingModel } from "../models/topping.model";
import mongoose from 'mongoose';

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


router.get("/getToppingbyIdstore/:idStore", asynceHandler(async (req, res) => {
    const idStore = req.params.idStore;
    const listTopping = await ToppingModel.find({MaCH:idStore});
    res.send(listTopping);
}));


router.post("/getToppingByID", asynceHandler(async (req, res) => {
    const { IdStore, idtopping } = req.body;
  
    try {
      const topping = await ToppingModel.findOne(
        { MaCH: IdStore, 'Topping._id': idtopping },
        { 'Topping.$': 1 } // Projection để lấy mảng con
      );
  
      if (!topping) {
        res.status(404).json({ success: false, message: 'Không tìm thấy Topping' });
        return;
      }
      const selectedTopping = topping.Topping[0];
      res.send(selectedTopping);
    } catch (error) {
      console.error('Lỗi khi lấy Topping:', error);
      res.status(500).json({ success: false, message: 'Lỗi khi lấy Topping' });
    }
  }));
  


    router.put("/updateToppingggg", asynceHandler(async (req, res) => {
        try {
            const { IdStore,idtopping, tentopping, gia, hinh } = req.body;
        
            const updatedTopping = await ToppingModel.findOneAndUpdate(
                { MaCH: IdStore, 'Topping._id': idtopping },
                {
                    $set: {
                        'Topping.$._id': new mongoose.Types.ObjectId(),
                        'Topping.$.tentopping': tentopping,
                        'Topping.$.hinh': hinh,
                        'Topping.$.gia': gia,
                    },
                },
                { new: true }
            );
    
            if (updatedTopping) {
                console.log('Thông tin Topping sau khi cập nhật:', updatedTopping);
                res.status(200).json({ success: true, message: 'Cập nhật thông tin Topping thành công' });
            } else {
                console.error('Không tìm thấy Topping hoặc có lỗi khi cập nhật.');
                res.status(404).json({ success: false, message: 'Không tìm thấy Topping hoặc có lỗi khi cập nhật.' });
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật Topping:', error);
            res.status(500).json({ success: false, message: 'Lỗi khi cập nhật Topping' + error });
        }
    }));
    


    router.post("/addNewTopping", asynceHandler(async (req, res) => {
        try {
            const { IdStore, tentopping, gia, hinh } = req.body;
    
            // Tìm Topping dựa trên MaCH (IdStore)
            let topping = await ToppingModel.findOne({ MaCH: IdStore });
    
            // Nếu không tìm thấy, khởi tạo mới một Topping với MaCH và mảng Topping rỗng
            if (!topping) {
                topping = new ToppingModel({ MaCH: IdStore, Topping: [] });
            }
    
            // Tạo mới một Topping để thêm vào mảng
            const newTopping = {
                _id:  new mongoose.Types.ObjectId(),
                tentopping: tentopping,
                gia: gia,
                hinh: hinh
            };
    
            // Thêm newTopping vào mảng Topping
            topping.Topping.push(newTopping);
    
            // Lưu Topping vào cơ sở dữ liệu
            await topping.save();
    
            res.status(200).json({ message: 'Thêm địa chỉ mới thành công' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error });
        }
    }));



    router.post("/deleteTopping", asynceHandler(async (req, res) => {
        try {
          const { IdStore, idtopping } = req.body;
      
          const query = {
            MaCH: IdStore,
          };
      
          const update = {
            $pull: {
              'Topping': {
                _id: idtopping,
              },
            },
          };
      
          const options = {
            new: true, // Trả về dữ liệu mới sau khi cập nhật
          };
      
          const updatedTopping = await ToppingModel.findOneAndUpdate(query, update, options);
      
          // Kiểm tra và xử lý kết quả
          if (updatedTopping) {
            console.log('Thông tin Topping sau khi xóa:', updatedTopping);
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
      
    
    

export default router;

