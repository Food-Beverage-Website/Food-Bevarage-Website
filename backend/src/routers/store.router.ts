import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { StoreModel } from "../models/store.model";
import { DonHangModel } from "../models/order.model";
import { ProductModel } from "../models/product.model";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import moment from "moment";

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

router.post('/addNewCategory', async (req, res) => {
  try {
    const { IdStore, TenDanhMuc } = req.body;

    // Tìm cửa hàng bằng _id
    const store = await StoreModel.findById(IdStore);

    // Nếu cửa hàng không tồn tại, có thể xử lý theo ý của bạn (ví dụ: trả về lỗi)
    if (!store) {
      return res.status(404).json({ message: 'Không tìm thấy cửa hàng.' });
    }

    // Thêm TenThucDon vào mảng ThucDons
    store.ThucDons.push({ TenThucDon: TenDanhMuc });

    // Lưu cập nhật
    await store.save();

    res.status(200).json({ message: 'Thêm danh mục mới thành công.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});


router.get("/get", asynceHandler(async (req, res) => {
  const { _id } = req.query;
  const store = await StoreModel.findById(_id);
  res.send(store);
}));

router.post("/register", asynceHandler(async (req, res) => {
  try {
    const { user, password, TenCuaHang, ChuSoHuu ,DiaChi, SDT,CCCD, Gmail } = req.body;

    const defaultCustomer = new StoreModel({
      TaiKhoan:user,
      MatKhau:password,
      Hinh:"OIP (4).jpg",
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
      }],
      ToaDo:"13.467049552728763, 112.30854877903359"
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


router.get("/test1/:namesearch",asynceHandler(
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



router.patch("/updateStore", asynceHandler(async (req, res) => {
    
  const {_id,TenShop,TenChu, CCCD, DiaChi, SDT, open, clode, hinh} = req.body;
 
 
    const updatedStore = await StoreModel.findOneAndUpdate(
      { _id:_id }, 
      {
          $set: {
              TenCuaHang:TenShop,
              ChuSoHuu:TenChu,
              CCCD:CCCD,
              DiaChi:DiaChi,
              SDT:SDT,
              GioMoCua:open,
              GioDongCua:clode,
              Hinh:hinh
          }
      },
      { new: true }
  );

  if (updatedStore) {
      console.log('Đã cập nhật thành công:', updatedStore);
      res.status(200).json(updatedStore); 
  } else {
      console.error('Không tìm thấy  để cập nhật hoặc có lỗi khi cập nhật');
      res.status(404).send('Không tìm thấy để cập nhật hoặc có lỗi khi cập nhật');
  }

}));



router.patch("/updateToaDo", asynceHandler(async (req, res) => {
  const { _id, ToaDo,DiaChi } = req.body;

  try {
    const updatedStore = await StoreModel.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          ToaDo: ToaDo,
          DiaChi:DiaChi
        }
      },
      { new: true }
    );

    if (updatedStore) {
      console.log('Đã cập nhật thành công:', updatedStore);
      res.status(200).json(updatedStore);
    } else {
      console.error('Không tìm thấy cửa hàng để cập nhật hoặc có lỗi khi cập nhật');
      res.status(404).send('Không tìm thấy cửa hàng để cập nhật hoặc có lỗi khi cập nhật');
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật cửa hàng:', error);
    res.status(500).send('Lỗi khi cập nhật cửa hàng');
  }
}));

router.get("/get_Store_All",asynceHandler(
  async (req,res)=>{ 
    try {
      const stores = await StoreModel.find();
      res.send(stores);
    } catch (error) {
      console.error('Error fetching stores:', error);
      res.status(500).send({ message: 'Internal server error' });
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



router.post("/thongke_Thang_SoDon_store", async (req, res) => {
  try {
    const idStore = req.body.MaCH.MaCH;
    console.log('Cửa hàng!:', idStore);

    const store_ch = await DonHangModel.find({ MaCH: idStore });

    const currentDate = new Date();
    const startOfThreeMonthsAgo = moment(currentDate).subtract(2, 'months').startOf('month').toDate();

    const don_hoanthanh3thang = Array(3).fill(0);
    const don_huy3thang = Array(3).fill(0);
    const tongSoDon3thang = Array(3).fill(0);

    const monthNames = Array(3).fill(null); // Khởi tạo mảng với giá trị null

    store_ch.forEach((donHang: any) => {
      const isAfterStartOfThreeMonthsAgo = moment(donHang.NgayDat).isAfter(startOfThreeMonthsAgo);
      const monthDiff = moment(donHang.NgayDat).diff(startOfThreeMonthsAgo, 'months');

      if (isAfterStartOfThreeMonthsAgo && monthDiff < 3) {
        const monthName = moment(donHang.NgayDat).format("MM"); // Lấy tên tháng

        // Sử dụng biến tạm thời để lưu trữ tên tháng
        let temporaryMonthName = `Tháng ${monthName}`;

        if (donHang.TinhTrangDonHang === "Đã giao") {
          don_hoanthanh3thang[monthDiff] += 1;
          tongSoDon3thang[monthDiff] += 1;
        } else if (donHang.TinhTrangDonHang === "Đã hủy") {
          don_huy3thang[monthDiff] += 1;
          tongSoDon3thang[monthDiff] += 1;
        }
        
        let tent = parseInt(monthName, 10) - 2;
        for(let i = 0; i < monthDiff; i++)
        {
          let tt = `Tháng ${tent}`;

          if (!monthNames[i]) {
            monthNames[i] = tt;
          }
          tent++;
        }

        // Nếu mảng monthNames chưa có giá trị tại vị trí monthDiff, gán giá trị vào
        if (!monthNames[monthDiff]) {
          monthNames[monthDiff] = temporaryMonthName;
        }
      }
    });

    let thongkestore = {
      don_hoanthanh3thang,
      don_huy3thang,
      tongSoDon3thang,
      monthNames,
    };

    res.send(thongkestore);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/thongke_Thang_DoanhThu_store", async (req, res) => {
  try {
    const idStore = req.body.MaCH.MaCH;

    const store_ch = await DonHangModel.find({ MaCH: idStore });

    const currentDate = new Date();
    const startOfThreeMonthsAgo = moment(currentDate).subtract(2, 'months').startOf('month').toDate();

    const don_doanhthu3thang = Array(3).fill(0);

    const monthNames = Array(3).fill(null); // Khởi tạo mảng với giá trị null

    store_ch.forEach((donHang: any) => {
      const isAfterStartOfThreeMonthsAgo = moment(donHang.NgayDat).isAfter(startOfThreeMonthsAgo);
      const monthDiff = moment(donHang.NgayDat).diff(startOfThreeMonthsAgo, 'months');

      if (isAfterStartOfThreeMonthsAgo && monthDiff < 3) {
        const monthName = moment(donHang.NgayDat).format("MM"); // Lấy tên tháng

        // Sử dụng biến tạm thời để lưu trữ tên tháng
        let temporaryMonthName = `Tháng ${monthName}`;

        if (donHang.TinhTrangDonHang === "Đã giao") {
          don_doanhthu3thang[monthDiff] += donHang.TongTien;
        } 
        let tent = parseInt(monthName, 10) - 2;

        for(let i = 0; i < monthDiff; i++)
        {
          let tt = `Tháng ${tent}`;

          if (!monthNames[i]) {
            monthNames[i] = tt;
          }
          tent++;
        }

        // Nếu mảng monthNames chưa có giá trị tại vị trí monthDiff, gán giá trị vào
        if (!monthNames[monthDiff]) {
          monthNames[monthDiff] = temporaryMonthName;
        }
      }
    });

    let thongkestore = {
      don_doanhthu3thang,     
      monthNames,
    };

    res.send(thongkestore);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/thongke_7ngay_SoDon_store", async (req, res) => {
  try {
    const idStore = req.body.MaCH.MaCH;
    console.log('Cửa hàng!:', idStore);

    const store_ch = await DonHangModel.find({ MaCH: idStore });

    const currentDate = new Date();
    const startOfSevenDaysAgo = moment(currentDate).subtract(6, 'days').startOf('day').toDate();

    const don_hoanthanh7ngay = Array(7).fill(0);
    const don_huy7ngay = Array(7).fill(0);
    const tongSoDon7ngay = Array(7).fill(0);

    const dayNames = Array(7).fill(null); // Khởi tạo mảng với giá trị null

    store_ch.forEach((donHang: any) => {
      const isAfterStartOfSevenDaysAgo = moment(donHang.NgayDat).isAfter(startOfSevenDaysAgo);
      const dayDiff = moment(donHang.NgayDat).diff(startOfSevenDaysAgo, 'days');

      if (isAfterStartOfSevenDaysAgo && dayDiff < 7) {
        const dayName = moment(donHang.NgayDat).format("DD/MM"); // Lấy ngày + tháng

        // Sử dụng biến tạm thời để lưu trữ ngày + tháng
        let temporaryDayName = `${dayName}`;

        if (donHang.TinhTrangDonHang === "Đã giao") {
          don_hoanthanh7ngay[dayDiff] += 1;
          tongSoDon7ngay[dayDiff] += 1;
        } else if (donHang.TinhTrangDonHang === "Đã hủy") {
          don_huy7ngay[dayDiff] += 1;
          tongSoDon7ngay[dayDiff] += 1;
        }

        for(let i = 0; i < dayDiff; i++)
        {
          let tt = moment(startOfSevenDaysAgo).add(i, 'days').format("DD/MM");

          if (!dayNames[i]) {
            dayNames[i] = tt;
          }
        }

        // Nếu mảng dayNames chưa có giá trị tại vị trí dayDiff, gán giá trị vào
        if (!dayNames[dayDiff]) {
          dayNames[dayDiff] = temporaryDayName;
        }
      }
    });

    // Thêm ngày hiện tại vào mảng dayNames nếu chưa có
    const currentDayName = moment(currentDate).format("DD/MM");
    if (!dayNames.includes(currentDayName)) {
      dayNames.push(currentDayName);
    }

    let thongkestore = {
      don_hoanthanh7ngay,
      don_huy7ngay,
      tongSoDon7ngay,
      dayNames,
    };

    res.send(thongkestore);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/thongke_7ngay_DoanhThu_store", async (req, res) => {
  try {
    const idStore = req.body.MaCH.MaCH;

    const store_ch = await DonHangModel.find({ MaCH: idStore });

    const currentDate = new Date();
    const startOfSevenDaysAgo = moment(currentDate).subtract(6, 'days').startOf('day').toDate();

    const don_doanhthu7ngay = Array(7).fill(0);

    const dayNames = Array(7).fill(null); // Khởi tạo mảng với giá trị null

    store_ch.forEach((donHang: any) => {
      const isAfterStartOfSevenDaysAgo = moment(donHang.NgayDat).isAfter(startOfSevenDaysAgo);
      const dayDiff = moment(donHang.NgayDat).diff(startOfSevenDaysAgo, 'days');

      if (isAfterStartOfSevenDaysAgo && dayDiff < 7) {
        const dayName = moment(donHang.NgayDat).format("DD/MM"); // Lấy ngày + tháng

        // Sử dụng biến tạm thời để lưu trữ ngày + tháng
        let temporaryDayName = `${dayName}`;

        if (donHang.TinhTrangDonHang === "Đã giao") {
          don_doanhthu7ngay[dayDiff] += donHang.TongTien;
        } 

        for(let i = 0; i < dayDiff; i++)
        {
          let tt = moment(startOfSevenDaysAgo).add(i, 'days').format("DD/MM");

          if (!dayNames[i]) {
            dayNames[i] = tt;
          }
        }

        // Nếu mảng dayNames chưa có giá trị tại vị trí dayDiff, gán giá trị vào
        if (!dayNames[dayDiff]) {
          dayNames[dayDiff] = temporaryDayName;
        }
      }
    });

        // Thêm ngày hiện tại vào mảng dayNames nếu chưa có
        const currentDayName = moment(currentDate).format("DD/MM");
        if (!dayNames.includes(currentDayName)) {
          dayNames.push(currentDayName);
        }

    let thongkestore = {
      don_doanhthu7ngay,     
      dayNames,
    };

    res.send(thongkestore);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



router.post("/thongke_Top5_SP_BanChayNhat_store", async (req, res) => {
  try {
    const idStore = req.body.MaCH.MaCH;

    const donHangs = await DonHangModel.find({ MaCH: idStore, TinhTrangDonHang: "Đã giao" }).populate('ChiTietDonHang.SanPham');

    const productCounts: any = {};

    // Lặp qua từng đơn hàng để đếm số lượng sản phẩm
    donHangs.forEach((donHang: any) => {
      donHang.ChiTietDonHang.forEach((chiTiet: any) => {
        const tenSP = chiTiet.SanPham.TenSP;

        if (!productCounts[tenSP]) {
          productCounts[tenSP] = chiTiet.SL;
        } else {
          productCounts[tenSP] += chiTiet.SL;
        }
      });
    });

    // Sắp xếp sản phẩm theo số lượng giảm dần và lấy 5 sản phẩm đầu tiên
    const sortedProducts = Object.keys(productCounts).sort((a, b) => productCounts[b] - productCounts[a]).slice(0, 5);

    // Tạo mảng kết quả
    const result = sortedProducts.map((tenSP) => ({
      tenSP,
      soLuong: productCounts[tenSP]
    }));

    // Tạo mảng chứa tên sản phẩm và số lượng sản phẩm
    const tenSPArray = result.map(item => item.tenSP);
    const soLuongArray = result.map(item => item.soLuong);

    // Trả về 2 mảng array trong response
    res.send({
      tenSPArray,
      soLuongArray
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/thongke_Top5_SP_BanE_store", async (req, res) => {
  try {
    const idStore = req.body.MaCH.MaCH;

    const donHangs = await DonHangModel.find({ MaCH: idStore, TinhTrangDonHang: "Đã giao" }).populate('ChiTietDonHang.SanPham');

    const productCounts: any = {};

    // Lặp qua từng đơn hàng để đếm số lượng sản phẩm
    donHangs.forEach((donHang: any) => {
      donHang.ChiTietDonHang.forEach((chiTiet: any) => {
        const tenSP = chiTiet.SanPham.TenSP;

        if (!productCounts[tenSP]) {
          productCounts[tenSP] = chiTiet.SL;
        } else {
          productCounts[tenSP] += chiTiet.SL;
        }
      });
    });

    // Sắp xếp sản phẩm theo số lượng giảm dần và lấy 5 sản phẩm đầu tiên
    const sortedProducts = Object.keys(productCounts).sort((a, b) => productCounts[a] - productCounts[b]).slice(0, 5);

    // Tạo mảng kết quả
    const result = sortedProducts.map((tenSP) => ({
      tenSP,
      soLuong: productCounts[tenSP]
    }));

    // Tạo mảng chứa tên sản phẩm và số lượng sản phẩm
    const tenSPArray = result.map(item => item.tenSP);
    const soLuongArray = result.map(item => item.soLuong);

    // Trả về 2 mảng array trong response
    res.send({
      tenSPArray,
      soLuongArray
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


export default router;