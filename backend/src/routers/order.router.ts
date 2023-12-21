import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { DonHangModel } from "../models/order.model";
import { BuyerModel } from "../models/buyer.model";


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


router.get("/getOrderConfirm/:idStore",asynceHandler(
    async (req,res)=>{ 
        const idStore = req.params.idStore;
        const DonHang = await DonHangModel.find({TinhTrangDonHang:'Chờ xác nhận', MaCH:idStore}).populate('KhachHang','TenKhachHang DiaChi');

        res.send(DonHang);
        
     }
))


router.get("/getAllOrderbyIdStore/:idStore",asynceHandler(
    async (req,res)=>{ 
        const idStore = req.params.idStore;
        const DonHang = await DonHangModel.find({ MaCH:idStore}).populate('KhachHang','TenKhachHang DiaChi SDT');

        res.send(DonHang);
     }
))


router.get("/getAllOrderbyIdOrder/:idOrder",asynceHandler(
    async (req,res)=>{ 
        const idOrder = req.params.idOrder;
        const DonHang = await DonHangModel.find({ _id:idOrder}).populate('KhachHang','TenKhachHang DiaChi SDT');

        res.send(DonHang);
     }
))


router.post("/orderGioHang", asynceHandler(async (req, res) => {
    const productGioHangJson = req.body.cartJson;

    let addedMaCH = ""; // Mảng để theo dõi các MaCH đã thêm vào danh sách
    let dem = 0;
    let demtrung = 0;
    let idCuoi = "";
    for (let i = 0; i < productGioHangJson.ChitietDonHang.length; i++) {
        const chiTietDonHang = productGioHangJson.ChitietDonHang[i];
        const buyerId = productGioHangJson.ChitietDonHang[i].KhachHang;

        const donHang = await DonHangModel.findOne({ MaCH: chiTietDonHang.MaCH, NgayDat: productGioHangJson.NgayDat });

        if (addedMaCH != "" && addedMaCH == chiTietDonHang.MaCH) {
            // Nếu tồn tại donHang và addedMaCH khác rỗng và bằng MaCH
            const updatedChiTietDonHang = {
                SanPham: chiTietDonHang.SanPham,
                SL: chiTietDonHang.SL,
                DonGia: chiTietDonHang.DonGia,
                Topping: chiTietDonHang.Topping
            };

            // Thêm một phần tử mới vào mảng ChiTietDonHang tại vị trí index của const aa
            // Tìm đơn hàng dựa trên MaCH và NgayDat
            await DonHangModel.findOneAndUpdate(
                { _id: idCuoi },
                { $push: { ChiTietDonHang: updatedChiTietDonHang } }
            );


            // Bổ sung lệnh cập nhật cơ sở dữ liệu BuyerModel
            await BuyerModel.findByIdAndUpdate(buyerId, {
                $pull: {
                    "GioHang": {
                        $and: [
                            { "MaSP": chiTietDonHang.SanPham },
                            { "DonGiaSizeLy.Size": chiTietDonHang.DonGia.Size }
                        ]
                    }
                }
            });
            demtrung++;
        } else {

            const newDonHang = new DonHangModel({
                KhachHang: chiTietDonHang.KhachHang,
                TongTien: chiTietDonHang.TongTien,
                paymentId :productGioHangJson.paymentId,
                NgayDat: productGioHangJson.NgayDat,
                PhuongThucThanhToan: productGioHangJson.PhuongThucThanhToan,
                TinhTrangDonHang: productGioHangJson.TinhTrangDonHang,
                ChiTietDonHang: [{
                    SanPham: chiTietDonHang.SanPham,
                    SL: chiTietDonHang.SL,
                    KhuyenMai: chiTietDonHang.KhuyenMai,
                    DonGiaKhuyenMai: chiTietDonHang.DonGiaKhuyenMai,
                    DonGia: chiTietDonHang.DonGia,
                    Topping: chiTietDonHang.Topping,
                }],
                MaCH: chiTietDonHang.MaCH,
                DiachiGH: productGioHangJson.DiachiGH,
                GhiChu: productGioHangJson.GhiChu,
            });

            // Lưu vào cơ sở dữ liệu
            const aa = await newDonHang.save();
            idCuoi = aa._id;

            addedMaCH = chiTietDonHang.MaCH;

            // Bổ sung lệnh cập nhật cơ sở dữ liệu BuyerModel
            await BuyerModel.findByIdAndUpdate(buyerId, {
                $pull: {
                    "GioHang": {
                        $and: [
                            { "MaSP": chiTietDonHang.SanPham },
                            { "DonGiaSizeLy.Size": chiTietDonHang.DonGia.Size }
                        ]
                    }
                }
            });
        }
        dem++;
    }

    res.send({ success: dem, demtrung: demtrung });
}));



router.patch("/updateOrder", asynceHandler(async (req, res) => {
    const { _id, TinhTrang } = req.body;
  
    try {
      const updatedOrder = await DonHangModel.findOneAndUpdate(
        { "_id": _id },
        {
          $set: {
            TinhTrangDonHang: TinhTrang
          }
        },
        { new: true }
      );
  
      if (updatedOrder) {
        console.log('Đã cập nhật thành công:', updatedOrder);
        res.status(200).json(updatedOrder);
      } else {
        console.error('Không tìm thấy cửa hàng để cập nhật hoặc có lỗi khi cập nhật');
        res.status(404).send('Không tìm thấy cửa hàng để cập nhật hoặc có lỗi khi cập nhật');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật cửa hàng:', error);
      res.status(500).send('Lỗi khi cập nhật cửa hàng');
    }
  }));

  //Code Duy Hung


  router.get("/getAllOrderByBuyer/:buyerId",asynceHandler(
    async (req,res)=>{
        const buyerId = req.params.buyerId;
        const ordersInfo = await DonHangModel.find({KhachHang: buyerId}).populate('KhachHang');
        if(!ordersInfo)
        {
            throw { status: 404, message: 'Không có đơn hàng nào' };
        }
        res.send(ordersInfo);
    }
))

router.patch("/cancelOrder/:orderId", asynceHandler(
    async (req, res) => {
      const orderId = req.params.orderId;

      const order = await DonHangModel.findById(orderId);
      if (!order) {
        throw { status: 404, message: 'Không tìm thấy đơn hàng' };
      }
      order.TinhTrangDonHang = "Đã hủy";
      await order.save();

      res.send({ message: 'Đã hủy đơn hàng thành công' });
    }
  ))

  router.patch("/xacNhanOrder/:orderId", asynceHandler(
    async (req, res) => {
      const orderId = req.params.orderId;

      const order = await DonHangModel.findById(orderId);
      if (!order) {
        throw { status: 404, message: 'Không tìm thấy đơn hàng' };
      }
      order.TinhTrangDonHang = "Đã giao";
      await order.save();

      res.send({ message: 'Xác nhận đơn hàng đã giao thành công' });
    }
  ))

  


export default router;
