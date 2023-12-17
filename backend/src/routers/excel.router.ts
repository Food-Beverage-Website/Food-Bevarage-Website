import { Request, Response, Router } from 'express';
import { ProductModel } from '../models/product.model';
import * as excelJS from 'exceljs';
import * as fs from 'fs';
import { promisify } from 'util';

const router = Router();
const writeFileAsync = promisify(fs.writeFile);

router.get('/getProductByIdStore/:idStore', async (req: Request, res: Response) => {
  try {
    const idStore = req.params.idStore;
    const products = await ProductModel.find({ MaCH: idStore });

    // Tạo workbook và worksheet
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');

 
      
      // ...
      
      worksheet.columns = [
        { header: 'Mã', key: 'id', width: 30 },
        { header: 'Tên sản phẩm', key: 'name', width: 30 },
        { header: 'Miêu tả', key: 'describe', width: 40 },
        { header: 'Kích cở', key: 'size', width: 20 },
        { header: 'Giá bán', key: 'price', width: 20 },
        { header: 'Ngày đăng', key: 'date', width: 20 },
        { header: 'Tình trạng', key: 'state', width: 20 },
      ];
      

    products.forEach((product) => {
        product.DonGia.forEach((price) => {
          worksheet.addRow({
            id: product._id,
            name: product.TenSP,
            describe: product.MieuTa,
            price: price.Gia,
            size: price.Size,
            date: product.NgayDang,
            state:product.TinhTrang
          });
        });
      });
    // Tạo tên file dựa trên idStore
    const fileName = `products_${idStore}.xlsx`;

    // Lưu workbook vào file Excel
    const filePath = `C:/Users/admin/Downloads/${fileName}`;  // Đặt đường dẫn tạm thời
    await workbook.xlsx.writeFile(filePath);

    // Gửi file Excel đã tạo cho client
    res.download(filePath, (err) => {
      // Xóa file tạm sau khi đã gửi xong
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
