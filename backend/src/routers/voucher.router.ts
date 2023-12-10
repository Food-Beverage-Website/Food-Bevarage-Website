import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { VoucherModel } from "../models/voucher.model";
import { BuyerModel } from "../models/buyer.model";



const router = Router();

router.get("/getType", asynceHandler(
    async (req, res) => {
        const productsCount = await VoucherModel.countDocuments();
        if (productsCount > 0) {
            res.send("Get is ready");
            return;
        }
        else {
            res.send("Get isnt ready");
            return;
        }
    }

))


router.get("/", asynceHandler(
    async (req, res) => {
        const products = await VoucherModel.find();
        res.send(products);
    }
))

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
