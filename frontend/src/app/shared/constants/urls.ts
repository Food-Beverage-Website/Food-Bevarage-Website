const BASE_URL = 'http://localhost:5000';

export const TYPE_GET_URL = BASE_URL + '/api/types';

export const PRODUCT_ALL_GET_URL = BASE_URL + '/api/products/getProduct';
export const PRODUCT_ALL_BY_NAME_GET_URL = BASE_URL + '/api/products/getProductByName';

export const BEST_SELLING_STORE_GET_URL = BASE_URL + '/api/stores/top5_store';

export const USER_LOGIN_URL = BASE_URL + '/api/buyer/login';

export const PRODUCT_BY_ID_CHITIET = BASE_URL + '/api/products/getProductByID';

export const PRODUCT_BY_JSON_PRODUCT_DETAIL = BASE_URL + '/api/buyer/themGioHang';

export const USER_CART_PRODUCT = BASE_URL + '/api/buyer/loadGioHang';

export const DELETE_PRODUCT_GIOHANG_BY_JSON_BUYER = BASE_URL + '/api/buyer/xoa1SanPhamGioHang';

export const EDIT_COUNT_PRODUCT_GIOHANG_BY_JSON_BUYER = BASE_URL + '/api/buyer/sua1SanPhamGioHang';

export const EDIT_COUNT_TOPPING_GIOHANG_BY_JSON_BUYER = BASE_URL + '/api/buyer/sua1ToppingSanPhamGioHang';

export const DELETE_TOPPING_GIOHANG_BY_JSON_BUYER = BASE_URL + '/api/buyer/xoa1ToppingGioHang';

export const GET_KHUYENMAI_THEO_CUAHANG_SANPHAM = BASE_URL + '/api/voucher/listKhuyenMaiTheoCuaHangSP';

export const GET_KHUYENMAI_THEO_GIOHANG = BASE_URL + '/api/voucher/listKhuyenMaiTheoGioHang';

