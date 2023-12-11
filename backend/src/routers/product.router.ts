import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { ProductModel } from "../models/product.model";
import { StoreModel } from "../models/store.model";
import { ToppingModel } from "../models/topping.model";
import { DonHangModel } from "../models/order.model";
import { VoucherModel } from "../models/voucher.model";

const mongoose = require('mongoose');

const router = Router();

router.get("/check",asynceHandler(
    async (req,res)=>{ 
        const productsCount = await ProductModel.countDocuments();
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






router.get("/", asynceHandler(async (req, res) => {
    try {
        const products = await ProductModel.find(); // Loại bỏ trường 'id'
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}))


router.get("/getProduct", asynceHandler(async (req, res) => {
 
        const productsWithStoreInfo = await ProductModel.find().populate('MaCH');
        productsWithStoreInfo.sort(() => Math.random() - 0.5);

        res.send(productsWithStoreInfo);
    
}));


router.get("/getProductByIdStore/:idStore", asynceHandler(async (req, res) => {
    const idStore = req.params.idStore;
    const products = await ProductModel.find({ MaCH:idStore});
    res.send(products);
}));






router.get("/getProductByName/:Searchname", asynceHandler(async (req, res) => {
    const productName = req.params.Searchname;
    const productsWithStoreInfo = await ProductModel.find({ TenSP: { $regex: productName, $options: 'i' } }).populate('MaCH');
    res.send(productsWithStoreInfo);
}));



router.get("/getProductByMenu/:MenuID", asynceHandler(async (req, res) => {
    const menuid = req.params.MenuID;
    const productsbyMenu = await ProductModel.find({ MaThucDon:menuid })
    res.send(productsbyMenu);
}));


router.get("/getProductbyIDProduct/:idSP", asynceHandler(async (req, res) => {
    const id = req.params.idSP;
    const productsbyMenu = await ProductModel.find({ _id:id })
    res.send(productsbyMenu);
}));


router.get("/GetAllProductbyName")

router.get("/getProductById/:productId", asynceHandler(async (req, res) => {
    const productId = req.params.productId;

    const productInfo = await ProductModel.findById(productId);

    // Kiểm tra xem sản phẩm có tồn tại hay không
    if (!productInfo) {
        throw { status: 404, message: 'Không tìm thấy sản phẩm' };
    } else {
        const storeInfo = await StoreModel.findById(productInfo.MaCH);

        if (storeInfo) {
            const toppings = await ToppingModel.find({ MaCH: storeInfo._id });
            const productWithToppings = {
                productInfo,
                toppings,
            };
            res.send(productWithToppings);
            return; // Exit the function after sending the response
        }
    }

    res.send(productInfo);
}));




router.get("/getProductById1/:productId", asynceHandler(async (req, res) => {
    const productId = req.params.productId;

    const productInfo = await ProductModel.findById(productId).populate('MaCH');

    // Kiểm tra xem sản phẩm có tồn tại hay không
    if (!productInfo) {
        throw { status: 404, message: 'Không tìm thấy sản phẩm' };
    } else {
        const storeInfo = await StoreModel.findById(productInfo.MaCH);

        if (storeInfo) {
            const toppings = await ToppingModel.find({ MaCH: storeInfo._id });

            let productInfo2: any[] = [];
            productInfo2.push(await ProductModel.findById(productId).populate('MaCH'));

            let danhsachKhuyenMai: any[] = [];

            for (const item of productInfo2) {

                let km = await VoucherModel.find({ MaCH: item.MaCH._id, "SanPhams.idsp": item._id });
                danhsachKhuyenMai.push(km);
            }

            const productWithToppings = {
                productInfo,
                toppings,
                storeInfo,
                danhsachKhuyenMai
            };
            res.send(productWithToppings);
            return; // Exit the function after sending the response
        }
    }
    res.send(productInfo);
}));


router.get("/getBestSellerProductbystore/:storeid", asynceHandler(async (req, res) => {
    const storeId = req.params.storeid;

    const idSanPham: { _id: string }[]   = await DonHangModel.aggregate([
        { $unwind: "$ChiTietDonHang" },
        { $group: { _id: "$ChiTietDonHang.SanPham", totalSold: { $sum: "$ChiTietDonHang.SL" } } },
      ]);
    
  
      const productIds = idSanPham.map(product => product._id);

      // Retrieve product details based on the extracted IDs
      const sanpham = await ProductModel.find({ _id: { $in: productIds },MaCH:storeId });

      res.send(sanpham);
}));



router.post("/addNewProduct", asynceHandler(async (req, res) => {
    
    const {TenSP,MieuTa,Hinh,NgayDang,TinhTrang,MaCH,MaThucDon,MaTieuMuc,DonGia} = req.body;
   
    const newProduct = new ProductModel({
        _id: new mongoose.Types.ObjectId(),
       TenSP:TenSP,
       MieuTa:MieuTa,
       Hinh:Hinh,
       NgayDang:NgayDang,
       TinhTrang:TinhTrang,
       MaCH:MaCH,
       MaThucDon:MaThucDon,
       MaTieuMuc:MaTieuMuc,
       DonGia: DonGia,
       DanhGia:[]
    });

    newProduct.save()
  .then((savedProduct) => {
    console.log('Đã thêm sản phẩm thành công:', savedProduct);
    res.status(201).json(savedProduct); // Trả về thông tin sản phẩm đã thêm
  })
  .catch((error) => {
    console.error('Lỗi khi thêm sản phẩm:', error);
    res.status(500).send('Lỗi khi thêm sản phẩm'+error);
  });
  
}));



router.patch("/updateProduct", asynceHandler(async (req, res) => {
    
    const {_id,TenSP,MieuTa,Hinh,TinhTrang,MaThucDon,MaTieuMuc,DonGia} = req.body;
   
   
      const updatedProduct = await ProductModel.findOneAndUpdate(
        { _id:_id }, 
        {
            $set: {
                TenSP: TenSP,
                MieuTa: MieuTa,
                Hinh: Hinh,
                
                TinhTrang: TinhTrang,
               
                MaThucDon: MaThucDon,
                MaTieuMuc: MaTieuMuc,
                DonGia: DonGia,
            }
        },
        { new: true }
    );

    if (updatedProduct) {
        console.log('Đã cập nhật sản phẩm thành công:', updatedProduct);
        res.status(200).json(updatedProduct); 
    } else {
        console.error('Không tìm thấy sản phẩm để cập nhật hoặc có lỗi khi cập nhật');
        res.status(404).send('Không tìm thấy sản phẩm để cập nhật hoặc có lỗi khi cập nhật');
    }
  
}));


router.delete("/deleteProduct/:idProduct", asynceHandler(async (req, res) => {
    
    const _id = req.params.idProduct;
    try {
    const deletedProduct = await ProductModel.findOneAndDelete({ _id });

    if (deletedProduct) {
        console.log('Đã xóa sản phẩm thành công:', deletedProduct);
        res.status(200).json(deletedProduct);
    } else {
        console.error('Không tìm thấy sản phẩm để xóa hoặc có lỗi khi xóa');
        res.status(404).send('Không tìm thấy sản phẩm để xóa hoặc có lỗi khi xóa');
    }
    } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    res.status(500).send('Lỗi khi xóa sản phẩm');
    }
  
}));

  


export default router;