import { Request, Response, Router } from 'express';
import { ProductModel } from '../models/product.model';
import * as excelJS from 'exceljs';
import * as fs from 'fs';
import { promisify } from 'util';
import { StoreModel } from '../models/store.model';

const router = Router();
const writeFileAsync = promisify(fs.writeFile);

router.get('/getProductByIdStore/:idStore', async (req: Request, res: Response) => {
  try {
    const idStore = req.params.idStore;
    const products = await ProductModel.find({ MaCH: idStore }).populate('MaCH');
    const store = await StoreModel.findById(idStore)
   
    // Tạo workbook và worksheet
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');

    // 1. Kết hợp ô A1 đến G1 và chèn chữ "Danh sách sản phẩm"
    worksheet.mergeCells('A1:G1');
    const mergedCell = worksheet.getCell('A1');
    mergedCell.value = 'Danh sách sản phẩm';
    mergedCell.alignment = { vertical: 'middle', horizontal: 'center' };

    mergedCell.font = {
      bold: true,
      size: 16,
      color: { argb: '000080' }, 
    };

    // 2. Chèn chữ "Tên cửa hàng" vào ô A2 và "Cửa hàng nội thất" vào ô B2
    worksheet.getCell('A2').value = 'Tên cửa hàng';
    worksheet.getCell('A2').font = {
      bold: true,
    };
    
    
 
   worksheet.getCell('B2').value = store?.TenCuaHang.toString(); // Assuming valueToAssign can be a string or 'fgfg'



        // 3. Chèn chữ "Địa chỉ" vào ô A3 và "TP.HCM" vào ô B3
    worksheet.getCell('A3').value = 'Địa chỉ';
    worksheet.getCell('A3').font = {
      bold: true,
    };

    worksheet.getCell('B3').value = store?.DiaChi.toString();

       // 4. Chèn chữ "Số điện thoại" vào ô A4 và "TP.HCM" vào ô B4
       worksheet.getCell('A4').value = 'SDT';
       worksheet.getCell('A4').font = {
        bold: true,
      };

       worksheet.getCell('B4').value = store?.SDT.toString();

       // 5. Chèn chữ "Số lượng sản phẩm:" vào ô A5 và "24" vào ô B5
worksheet.getCell('A5').value = 'Số lượng sản phẩm:';
worksheet.getCell('A5').font = {
  bold: true,
};

worksheet.getCell('B5').value = products.length.toString();


// 5. Chèn chữ "Ngày xuất file" vào ô A6 và "24/14/2020" vào ô B6
worksheet.getCell('A6').value = 'Ngày xuất file';
worksheet.getCell('A6').font = {
  bold: true,
};
const currentDate = new Date();
worksheet.getCell('B6').value = currentDate.toDateString();


    worksheet.getCell('A7').value = 'Mã';
    worksheet.getCell('B7').value = 'Tên sản phẩm';
    worksheet.getCell('C7').value = 'Miêu tả';
    worksheet.getCell('D7').value = 'Kích cở';
    worksheet.getCell('E7').value = 'Giá bán';
    worksheet.getCell('F7').value = 'Ngày đăng';
    worksheet.getCell('G7').value = 'Tình trạng';
    
    // Thiết lập cột từ dòng thứ 4
    worksheet.columns = [
      { key: 'id', width: 30 },
      { key: 'name', width: 30 },
      { key: 'describe', width: 40 },
      { key: 'size', width: 20 },
      { key: 'price', width: 20 },
      { key: 'date', width: 20 },
      { key: 'state', width: 20 },
    ];

    
const headerRow = worksheet.getRow(7);
headerRow.fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: '3498DB' }, // Màu nền xanh
};
headerRow.font = {
  bold: true,
  color: { argb: 'FFFFFF' }, // Màu chữ trắng
};
headerRow.alignment = {
  vertical: 'middle',
  horizontal: 'center',
};
    
    // Thêm dữ liệu từ hàng thứ 5
    products.forEach((product, index) => {
      product.DonGia.forEach((price) => {
        const rowIndex = index + 8; // Bắt đầu từ dòng thứ 5
        worksheet.addRow({
          id: product._id,
          name: product.TenSP,
          describe: product.MieuTa,
          price: price.Gia,
          size: price.Size,
          date: product.NgayDang,
          state: product.TinhTrang,
        }, `A${rowIndex}`); // Gán ô bắt đầu từ cột A, dòng rowIndex
      });
    });
    
    const imageId1 = workbook.addImage({
      filename: 'C:/Users/admin/Documents/GitHub/Food-Bevarage-Website/frontend/src/assets/Images/logo.jpg',
      extension: 'jpeg',
    });

  
    
    worksheet.addImage(imageId1, {
      tl: { col: 4, row: 1 },
      ext: { width: 200, height: 70 }, // Thay thế br bằng ext và chỉ định width và height
      editAs: 'absolute',
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


router.post('/postProductByIdStore/:idStore', async (req:Request, res:Response)=>{

  



});

export default router;
