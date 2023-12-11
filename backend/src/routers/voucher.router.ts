import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { Voucher, VoucherModel } from "../models/voucher.model";
import { ProductModel } from "../models/product.model";
import mongoose from "mongoose";
import { BuyerModel } from "../models/buyer.model";


const router = Router();

router.get("/getType",asynceHandler(
    async (req,res)=>{ 
        const productsCount = await VoucherModel.countDocuments();
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


router.get("/getAllbyIDStore/:idStore",asynceHandler( 
    async (req,res)=>{ 
        const storeId = req.params.idStore;
       const voucher = await VoucherModel.find({MaCH:storeId});
       res.send(voucher);
     }
))

router.get("/getAll",asynceHandler( 
    async (req,res)=>{ 
     
       const voucher = await VoucherModel.find();
       res.send(voucher);
     }
))

router.get("/getproductbyIDvoucher/:idVoucher",asynceHandler( 
    async (req,res)=>{ 
        const Id = req.params.idVoucher;

        const voucher:Voucher =  await VoucherModel.findById(Id)
        const idSanPham: { idsp: string }[] =voucher.SanPhams

        const productIds = idSanPham.map(product => product.idsp);
        const sanpham = await ProductModel.find({ _id: { $in: productIds }});
       
        res.send(sanpham);
     }
))


router.get("/noneProductVoucher/:idVoucher",asynceHandler( 
    async (req,res)=>{ 
        
        const Idvoucher = req.params.idVoucher;
        const voucher:Voucher =  await VoucherModel.findById(Idvoucher)

        const voucherList:Voucher[] =  await VoucherModel.find({MaCH:voucher.MaCH})
        const idSanPham:  string [] =[]
        voucherList.forEach(element => {
            element.SanPhams.forEach(e => {
                idSanPham.push(e.idsp)
            });
            });

       
        const sanpham = await ProductModel.find({ _id: { $nin: idSanPham },MaCH:voucher.MaCH});
       
        res.send(sanpham);
     }
))

router.post("/changeAppliedProduct",asynceHandler( 
    async (req,res)=>{ 
    try {
      const { idVoucher, listID = [] } = req.body;
  
      const query = {
        _id: idVoucher,
      };
  
      const update = {
        $pull: {
          'SanPhams': {
            idsp: { $in: listID },
          },
        },
      };
  
      const options = {
        new: true, // Trả về dữ liệu mới sau khi cập nhật
      };
  
      const updatedVoucher = await VoucherModel.findOneAndUpdate(query, update, options);
  

      if (updatedVoucher) {
        console.log('Thông tin Voucher sau khi xóa:', updatedVoucher);
        res.status(200).json({ success: true, message: 'Xóa Voucher thành công' });
      } else {
        console.error('Không tìm thấy Voucher hoặc có lỗi khi xóa.');
        res.status(404).json({ success: false, message: 'Không tìm thấy Voucher hoặc có lỗi khi xóa'});
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Lỗi khi xóa Voucher:', error);
      res.status(500).json({ success: false, message: 'Lỗi khi xóa Voucher' + error });
    }
  }));

  router.post("/addApplyProduct", asynceHandler(async (req, res) => {
    try {
        const { idVoucher, listID = [] }: { idVoucher: string, listID: string[] } = req.body;
    
        const query = {
          _id: idVoucher,
        };
    
        const update = {
          $push: {
            'SanPhams': {
              $each: listID.map(id => ({ idsp: id })),
            },
          },
        };
    
        const options = {
          new: true, // Trả về dữ liệu mới sau khi cập nhật
        };
    
        const updatedVoucher = await VoucherModel.findOneAndUpdate(query, update, options);
    
        if (updatedVoucher) {
          console.log('Thông tin Voucher sau khi thêm:', updatedVoucher);
          res.status(200).json({ success: true, message: 'Thêm Voucher thành công' });
        } else {
          console.error('Không tìm thấy Voucher hoặc có lỗi khi thêm.');
          res.status(404).json({ success: false, message: 'Không tìm thấy Voucher hoặc có lỗi khi thêm'});
        }
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi thêm Voucher:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi thêm Voucher' + error });
      }
  }));


  router.post("/createVoucher", asynceHandler(
    async (req, res) => {
      const { TenKhuyenMai,MaCH, NgayBatDau, NgayKetThuc, PhanTramGiam, Hinh } = req.body;
      const newVoucher = new VoucherModel({
        _id:  new mongoose.Types.ObjectId(),
        TenKhuyenMai: TenKhuyenMai,
        NgayBatDau: NgayBatDau,
        MaCH:MaCH,
        NgayKetThuc: NgayKetThuc,
        PhanTramGiam: PhanTramGiam,
        Hinh: Hinh
      });
  
      try {
        const savedVoucher = await newVoucher.save();
        console.log('Đã thêm sản phẩm thành công:', savedVoucher);
        res.status(201).json(savedVoucher); // Trả về thông tin sản phẩm đã thêm
      } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
        res.status(500).send('Lỗi khi thêm sản phẩm' + error);
      }
    }
  ))
  
  
  router.patch("/updateVoucher",asynceHandler(
    async (req,res)=>{ 
        
        const { idVoucher, TenKhuyenMai, NgayBatDau, NgayKetThuc,PhanTramGiam,Hinh} = req.body;
        const updatedVoucher = await VoucherModel.findOneAndUpdate(
            { _id:idVoucher }, 
            {
                $set: {
                  TenKhuyenMai:TenKhuyenMai,
                  NgayBatDau:NgayBatDau,
                  NgayKetThuc:NgayKetThuc,
                  PhanTramGiam:PhanTramGiam,
                  Hinh:Hinh
                }
            },
            { new: true }
        );
    
        if (updatedVoucher) {
            console.log('Đã cập nhật khuyến mãi thành công:', updatedVoucher);
            res.status(200).json(updatedVoucher); 
        } else {
            console.error('Không tìm thấy khuyến mãi để cập nhật hoặc có lỗi khi cập nhật');
            res.status(404).send('Không tìm thấy khuyến mãi để cập nhật hoặc có lỗi khi cập nhật');
        }
     }
))



router.delete("/deleteVoucher/:id", asynceHandler(async (req, res) => {
    
    const _id = req.params.id;
    try {
    const deletedVoucher= await VoucherModel.findOneAndDelete({ _id });

    if (deletedVoucher) {
        console.log('Đã xóa khuyến mãi thành công:', deletedVoucher);
        res.status(200).json(deletedVoucher);
    } else {
        console.error('Không tìm thấy khuyến mãi để xóa hoặc có lỗi khi xóa');
        res.status(404).send('Không tìm thấy khuyến mãi để xóa hoặc có lỗi khi xóa');
    }
    } catch (error) {
    console.error('Lỗi khi xóa khuyến mãi:', error);
    res.status(500).send('Lỗi khi xóa khuyến mãi');
    }
  
}));

//====================================================
//Duy Minh

router.post("/listKhuyenMaiTheoCuaHangSP", asynceHandler(async (req, res) => {
  const productGioHangJson = req.body.productGioHangJson;
  let danhsachKhuyenMai: any[] = [];

  for (const item of productGioHangJson) {

      let km = await VoucherModel.find({ MaCH: item.MaCH, "SanPhams.idsp": item.MaSP });
      danhsachKhuyenMai.push(km);
  }
  res.send(danhsachKhuyenMai);

}
))


router.post("/listKhuyenMaiTheoGioHang", asynceHandler(async (req, res) => {
  const buyerId = req.body.idKhachHang;

  const buyer = await BuyerModel.findById(buyerId)
      .populate({
          path: 'GioHang.MaSP',
          populate: {
              path: 'MaCH',
              model: 'cuahang'  // Thay 'Cuahang' bằng tên chính xác của collection CuaHang
          }
      })
      .lean();

  let danhsachKhuyenMai: any;
  let addedMaCH: string[] = []; // Mảng để theo dõi các MaCH đã thêm vào danh sách

  for (const item of buyer.GioHang) {
      // Kiểm tra xem MaCH đã thêm vào danh sách hay chưa
      if (!addedMaCH.includes(item.MaSP.MaCH._id.toString())) {

          const km = await VoucherModel.find({ MaCH: item.MaSP.MaCH._id, "SanPhams.idsp": item.MaSP._id });
          // Kiểm tra xem km có rỗng không
          if (km.length > 0) {
              if (!danhsachKhuyenMai) {
                  danhsachKhuyenMai = []; // Khởi tạo mảng nếu nó chưa tồn tại
              }
              danhsachKhuyenMai.push(km);
              addedMaCH.push(item.MaSP.MaCH._id.toString());

          }

      }
  }


  res.send(danhsachKhuyenMai);
}));







export default router;
