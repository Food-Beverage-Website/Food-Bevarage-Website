import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { BuyerModel } from "../models/buyer.model";
import jwt from "jsonwebtoken";
import { ToppingModel } from "../models/topping.model";
import { ProductModel } from "../models/product.model";


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


router.post("/addAddress", asynceHandler(async (req, res) => {
    try {
      const { idKhachHang, TenNhanHang, DiaChi, SDT } = req.body;
  
      const user = await BuyerModel.findOne({ _id: idKhachHang });
  
      const newAddress = {
        TenNhanHang: TenNhanHang,
        DiaChi: DiaChi,
        SDT: SDT
      };
      user.DiaChis.push(newAddress);
      await user.save();
  
      res.status(200).json({ message: 'Thêm địa chỉ mới thành công' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
}));



router.get("/delAddress/:idKhachHang/:idDiaChi", asynceHandler(async (req, res) => {
    try {
      
      const idKhachHang = req.params.idKhachHang;
        const idDiaChi= req.params.idDiaChi;
      const user = await BuyerModel.findOne({ _id: idKhachHang });
  
      if (user) {
        const result = await user.updateOne(
          { $pull: { DiaChis: { _id: idDiaChi } } }
        );
  
        if (result.nModified > 0) {
          res.status(200).json({ message: "Xóa thành công" });
        } else {
          res.status(404).json({ message: "Không tìm thấy địa chỉ để xóa." });
        }
      } else {
        res.status(404).json({ message: "Người dùng không tồn tại." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  }));






router.get("/getBuyerByID/:idKhachHang", asynceHandler(async (req, res) => {
    try {
        const idKhachHang = req.params.idKhachHang;
    
        const user = await BuyerModel.findOne({ _id: idKhachHang });
        res.send(user);
      
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
      }
}));

router.get("/signin", asynceHandler(async (req, res) => {
  try {
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
      to: 'ohshit781@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
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

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}));





router.post("/register", asynceHandler(async (req, res) => {
  try {
    const { user, password, TenKhachHang, DiaChi, SDT, Gmail } = req.body;

    const defaultCustomer = new BuyerModel({
      TenKhachHang: TenKhachHang,
      SDT: SDT,
      DiaChi: DiaChi,
      MatKhau: password,
      TaiKhoan: user,
      TichDiem: 0,
      Gmail: Gmail,
      GioHang: [],
      DiaChis: [],
    });

    // Save the new document to the database
    const savedCustomer = await defaultCustomer.save();

    res.status(201).json(savedCustomer); // Respond with the saved document
  } catch (error) {
    console.error('Lỗi khi thêm khách hàng:', error);
    res.status(500).json({ message: 'Lỗi khi thêm khách hàng', error: error });
  }
}));




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


router.post("/themGioHang", asynceHandler(async (req, res) => {
  try {
    const productJson = req.body.productJson;
    console.log('Received product JSON:', productJson);

    // Lấy thông tin người mua từ cơ sở dữ liệu, sử dụng BuyerModel
    const buyerId = productJson.idUser;  // Thay thế bằng cách lấy BuyerId từ đâu đó
    const buyer = await BuyerModel.findById(buyerId).lean();

    if (!buyer) {
      // Nếu không tìm thấy người mua, trả về lỗi
      throw { status: 404, message: 'Không tìm thấy thông tin người mua' };
    }

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const existingProductIndex = buyer.GioHang.findIndex((item: any) => {
      return item.MaSP == productJson.MaSP?.$oid && item.DonGiaSizeLy.Size === productJson.DonGiaSizeLy.Size;
    });

    if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng
      buyer.GioHang[existingProductIndex].DonGiaSizeLy.SL += productJson.DonGiaSizeLy.SL;

      var tonggiamoi = productJson.DonGiaSizeLy.SL * productJson.DonGiaSizeLy.Dongia;

      buyer.GioHang[existingProductIndex].ThanhTien += tonggiamoi;

      // Kiểm tra và thêm toppings vào sản phẩm nếu chưa tồn tại
      productJson.DongiaToppings.forEach((newTopping: any) => {
        const existingToppingIndex = buyer.GioHang[existingProductIndex].DongiaToppings.findIndex((existingTopping: any) => {
          return existingTopping._id == newTopping._id;
        });

        if (existingToppingIndex !== -1) {

          buyer.GioHang[existingProductIndex].DongiaToppings[existingToppingIndex].soluongtopping += newTopping.soluongtopping;
         // Nếu Topping đã tồn tại, tăng số lượng, giá và tổng giá Topping
          buyer.GioHang[existingProductIndex].DongiaToppings[existingToppingIndex].giatopping += newTopping.giatopping;
          buyer.GioHang[existingProductIndex].ThanhTien += newTopping.giatopping * newTopping.soluongtopping;

        } else {        
          // Nếu Topping chưa tồn tại, thêm mới vào sản phẩm
          buyer.GioHang[existingProductIndex].DongiaToppings.push(newTopping);
          buyer.GioHang[existingProductIndex].ThanhTien += newTopping.giatopping * newTopping.soluongtopping;


        }
      });

      // Cập nhật thời gian thêm giỏ hàng
      buyer.GioHang[existingProductIndex].ThoiGianThemGH = productJson.ThoiGianThemGH;

      // Di chuyển sản phẩm đã tồn tại lên đầu mảng
      const updatedProduct = buyer.GioHang.splice(existingProductIndex, 1)[0];
      buyer.GioHang.unshift(updatedProduct);


    } else {
      // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
      buyer.GioHang.unshift({
        MaSP: productJson.MaSP.$oid,
        ThoiGianThemGH: productJson.ThoiGianThemGH,
        DonGiaSizeLy: productJson.DonGiaSizeLy,
        DongiaToppings: productJson.DongiaToppings,    
        ThanhTien: productJson.ThanhTien,
        GhiChu: productJson.GhiChu,
      });
    }

    // Cập nhật thông tin người mua trong cơ sở dữ liệu
    await BuyerModel.findByIdAndUpdate(buyerId, { GioHang: buyer.GioHang });

    // Trả về một đối tượng JSON và đặt Content-Type header
    res.status(200).json({ message: 'Product added to the cart successfully', buyer, existingProductIndex });
  } catch (error) {
    console.error('Error processing product JSON:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}));




router.post("/loadGioHang", asynceHandler(async (req, res) => {
  try {
    const buyerId = req.body.idKhachHang;
    if (!buyerId) {
      // Nếu không tìm thấy người mua, trả về lỗi
      res.status(500).json({ error: 'lỗi id khách hàng' });
    }


    const buyer1 = await BuyerModel.findById(buyerId)
    {
      for (const gioHangItem of buyer1.GioHang) {
        const product = await ProductModel.findById(gioHangItem.MaSP._id);
        if (!product) {

          // Nếu không tìm thấy sản phẩm, xóa nó khỏi giỏ hàng và cơ sở dữ liệu
          await BuyerModel.findByIdAndUpdate(buyerId, { $pull: { "GioHang": { MaSP: gioHangItem.MaSP._id } } });


        }
        else {
          const sizeInfo = product.DonGia.find((size) => size.Size === gioHangItem.DonGiaSizeLy.Size);

          if (!sizeInfo) {
            // Nếu không tìm thấy size, xóa sản phẩm khỏi giỏ hàng và cơ sở dữ liệu
            await BuyerModel.findByIdAndUpdate(buyerId, {
              $pull: {
                "GioHang": {
                  $and: [
                    { "MaSP": gioHangItem.MaSP._id },
                    { "DonGiaSizeLy.Size": gioHangItem.DonGiaSizeLy.Size }
                  ]
                }
              }
            });


          }
          else{

            await BuyerModel.findOneAndUpdate(
              {
                "GioHang.MaSP": gioHangItem.MaSP._id,
                "GioHang.DonGiaSizeLy.Size": gioHangItem.DonGiaSizeLy.Size
              },
              { $set: { "GioHang.$.DonGiaSizeLy.Dongia": sizeInfo.Gia } },
              { new: true } // Trả về giá trị mới sau khi cập nhật
            );
    
    
          }
        }

      }
    }

    // Lấy thông tin người mua từ cơ sở dữ liệu, sử dụng BuyerModel
    const buyer = await BuyerModel.findById(buyerId)
      .populate({
        path: 'GioHang.MaSP',
        populate: {
          path: 'MaCH',
          model: 'cuahang'  // Thay 'Cuahang' bằng tên chính xác của collection CuaHang
        }
      })
      .lean();

    if (!buyer) {
      // Nếu không tìm thấy người mua, trả về lỗi
      res.status(500).json({ error: 'Không tìm thấy người dùng' });
    }




    for (const gioHangItem of buyer.GioHang) {
      for (const toppingItem of gioHangItem.DongiaToppings) {
        const topping = await ToppingModel.findOne({
          "MaCH": gioHangItem.MaSP.MaCH._id,
          "Topping._id": toppingItem._id
        });

        if (topping) {
          const foundToppingInfo = topping.Topping.find((toppingInfo: any) => toppingInfo._id.toString() === toppingItem._id.toString());

          if (foundToppingInfo) {

            toppingItem.giatopping = foundToppingInfo.gia;
          } else {
            // Nếu không tìm thấy thông tin topping, xóa nó khỏi giỏ hàng và cơ sở dữ liệu

            await BuyerModel.findByIdAndUpdate(buyerId, {
              $pull: {
                "GioHang.$[].DongiaToppings": {
                  "_id": toppingItem._id
                }
              }
            });
          }
        } else {


          // Nếu không tìm thấy topping, xóa nó khỏi giỏ hàng và cơ sở dữ liệu
          // Bên trong khối else khi bạn muốn xóa toppingItem từ mảng
          await BuyerModel.findByIdAndUpdate(buyerId, {
            $pull: {
              "GioHang.$[].DongiaToppings": {
                "_id": toppingItem._id
              }
            }
          });
        }
      }
    }
    // Thực hiện lọc nhóm

    if (buyer && buyer.GioHang && buyer.GioHang.length > 1) {
      // Bước 1: Nhóm các sản phẩm cùng cửa hàng
      const groupedProducts: any = {};
      buyer.GioHang.forEach((product: any) => {
        const storeId = product.MaSP.MaCH._id.toString();
        if (!groupedProducts[storeId]) {
          groupedProducts[storeId] = [];
        }
        groupedProducts[storeId].push(product);
      });

      // Bước 2: Sắp xếp các nhóm theo số index nhỏ nhất của phần tử
      const sortedGroups: any = Object.values(groupedProducts).sort((groupA: any, groupB: any) => {
        const minIndexA = Math.min(...groupA.map((item: any) => item.index || 0));
        const minIndexB = Math.min(...groupB.map((item: any) => item.index || 0));
        return minIndexA - minIndexB;
      });

      // Bước 3: Gán lại mảng sản phẩm đã được sắp xếp
      buyer.GioHang = [].concat(...sortedGroups);
    }

    // Gửi thông tin giỏ hàng của người mua trong res.send
    res.send(buyer);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi load giỏ hàng' });
  }
}));


router.post("/xoa1SanPhamGioHang", asynceHandler(async (req, res) => {
  const productGioHangJson = req.body.productGioHangJson;
  const buyerId = req.body.productGioHangJson.idKhachHang;
  if (!buyerId) {
    // Nếu không tìm thấy người mua, trả về lỗi
    res.status(500).json({ error: 'lỗi id khách hàng' });
  }

  const buyer = await BuyerModel.findById(buyerId)


  if (!buyer) {
    // Nếu không tìm thấy người mua, trả về lỗi
    res.status(500).json({ error: 'Không tìm thấy người dùng' });
  }
  

  try
  {
    await BuyerModel.findByIdAndUpdate(buyerId, {
      $pull: {
        "GioHang": {
          $and: [
            { "MaSP": productGioHangJson.MaSP._id },
            { "DonGiaSizeLy.Size": productGioHangJson.DonGiaSizeLy.Size }
          ]
        }
      }
    });

    res.send(buyer);

  }
  catch (error) {
    res.status(121).json({ error: 'Lỗi xóa sản phẩm giỏ hàng' });
  }

}));



router.post("/sua1SanPhamGioHang", asynceHandler(async (req, res) => {
  const productGioHangJson = req.body.productGioHangJson;
  const buyerId = req.body.productGioHangJson.idKhachHang;


  if (!buyerId) {
    // Nếu không tìm thấy người mua, trả về lỗi
    res.status(500).json({ error: 'lỗi id khách hàng' });
  }

  const buyer = await BuyerModel.findById(buyerId)


  if (!buyer) {
    // Nếu không tìm thấy người mua, trả về lỗi
    res.status(500).json({ error: 'Không tìm thấy người dùng' });
  }
  

  try
  {
    await BuyerModel.findOneAndUpdate(
      {
        "GioHang.MaSP": productGioHangJson.MaSP._id,
        "GioHang.DonGiaSizeLy.Size": productGioHangJson.DonGiaSizeLy.Size
      },
      { $set: { "GioHang.$.DonGiaSizeLy.SL": productGioHangJson.DonGiaSizeLy.SL } },
      { new: true } // Trả về giá trị mới sau khi cập nhật
    );

    res.send(buyer);

  }
  catch (error) {
    res.status(121).json({ error: 'Lỗi sửa sản phẩm giỏ hàng' });
  }

}));



router.post("/sua1ToppingSanPhamGioHang", asynceHandler(async (req, res) => {
  const productGioHangJson = req.body.productGioHangJson;
  const buyerId = req.body.productGioHangJson.idKhachHang;
  const idTopping = req.body.productGioHangJson.idTopping;
  const sltopping = req.body.productGioHangJson.sltopping;



  if (!buyerId) {
    // Nếu không tìm thấy người mua, trả về lỗi
    res.status(500).json({ error: 'lỗi id khách hàng' });
  }

  const buyer = await BuyerModel.findById(buyerId)


  if (!buyer) {
    // Nếu không tìm thấy người mua, trả về lỗi
    res.status(500).json({ error: 'Không tìm thấy người dùng' });
  }
  

  try
  {
    await BuyerModel.findOneAndUpdate(
      {
        "GioHang.MaSP": productGioHangJson.MaSP._id,
        "GioHang.DonGiaSizeLy.Size": productGioHangJson.DonGiaSizeLy.Size,
        "GioHang.DongiaToppings._id": idTopping
      },
      { 
        $set: { 
          "GioHang.$[outer].DongiaToppings.$[inner].soluongtopping": sltopping 
        }
      },
      { 
        arrayFilters: [
          { "outer.MaSP": productGioHangJson.MaSP._id },
          { "inner._id": idTopping }
        ],
        new: true
      }
    );
    

    res.send(buyer);

  }
  catch (error) {
    res.status(121).json({ error: 'Lỗi sửa topping giỏ hàng' });
  }

}));


router.post("/xoa1ToppingGioHang", asynceHandler(async (req, res) => {
  const productGioHangJson = req.body.productGioHangJson;
  const buyerId = req.body.productGioHangJson.idKhachHang;
  const idTopping = req.body.productGioHangJson.idTopping;

  if (!buyerId) {
    // Nếu không tìm thấy người mua, trả về lỗi
    res.status(500).json({ error: 'lỗi id khách hàng' });
  }

  const buyer = await BuyerModel.findById(buyerId)


  if (!buyer) {
    // Nếu không tìm thấy người mua, trả về lỗi
    res.status(500).json({ error: 'Không tìm thấy người dùng' });
  }
  

  try
  {
    await BuyerModel.findOneAndUpdate(
      {
        "GioHang.MaSP": productGioHangJson.MaSP._id,
        "GioHang.DonGiaSizeLy.Size": productGioHangJson.DonGiaSizeLy.Size,
      },
      { 
        $pull: { 
          "GioHang.$.DongiaToppings": { "_id": idTopping }
        }
      },
      { 
        new: true
      }
    );

    res.send(buyer);

  }
  catch (error) {
    res.status(121).json({ error: 'Lỗi xóa sản phẩm giỏ hàng' });
  }

}));


export default router;
