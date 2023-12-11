const BASE_URL = 'http://localhost:5000';

export const TYPE_GET_URL = BASE_URL + '/api/types';

export const PRODUCT_ALL_GET_URL = BASE_URL + '/api/products/getProduct';
export const PRODUCT_ALL_BY_NAME_GET_URL = BASE_URL + '/api/products/getProductByName';
export const PRODUCT_GET_BY_ID_STORE_URL = BASE_URL + '/api/products/getProductByIdStore';
export const PRODUCT_GET_BY_ID_MENU_URL= BASE_URL + '/api/products/getProductByMenu';
export const PRODUCT_BEST_SELLER_BY_ID_STORE_URL= BASE_URL + '/api/products/getBestSellerProductbystore';
export const PRODUCT_NEW_ADD_URL= BASE_URL + '/api/products/addNewProduct';
export const PRODUCT_GET_BY_ID_URL= BASE_URL + '/api/products/getProductbyIDProduct';
export const PRODUCT_UPDATE_BY_ID_URL= BASE_URL + '/api/products/updateProduct';
export const PRODUCT_DELETE_BY_ID_URL= BASE_URL + '/api/products/deleteProduct';


export const STORE_BEST_SELLING_GET_URL = BASE_URL + '/api/stores/top5_store';
export const STORE_LOGIN_URL = BASE_URL + '/api/stores/login';
export const STORE_GET_BY_ID_URL = BASE_URL + '/api/stores/getStorebyId';
export const STORE_SEARCH_BY_NAME_URL = BASE_URL + '/api/stores/getStorebyname';
export const STORE_NEW_URL = BASE_URL + '/api/stores/register';


export const USER_LOGIN_URL = BASE_URL + '/api/buyer/login';
export const USER_ADD_ADDRESS_URL = BASE_URL + '/api/buyer/addAddress';
export const USER_GET_BUYER_BY_ID_URL = BASE_URL + '/api/buyer/getBuyerByID';
export const USER_DEL_ADDRESS_URL = BASE_URL + '/api/buyer/delAddress';
export const USER_ADD_NEW_URL = BASE_URL + '/api/buyer/register';

export const MENU_GET_BY_ID_STORE_URL = BASE_URL + '/api/menus/getMenubyIDstore';
export const MENU_PATCH_URL = BASE_URL + '/api/stores/addApplyProduct';
export const MENU_UPDATE_NAME_URL = BASE_URL + '/api/stores/updateThucDon';
export const MENU_DELETE_NAME_URL = BASE_URL + '/api/stores/deleteThucDon';

export const ORDER_GET_UNCONFIRM_URL = BASE_URL + '/api/order/getOrderConfirm';
export const ORDER_GET_ALL_BY_ID_STORE_URL = BASE_URL + '/api/order/getAllOrderbyIdStore';

export const TOPPING_GET_ALL_BY_ID_STORE_URL = BASE_URL + '/api/topping/getToppingbyIdstore';
export const TOPPING_POST_ADD_TOPPING_URL = BASE_URL + '/api/topping/addNewTopping';
export const TOPPING_GET_TOPPING_BY_ID_URL = BASE_URL + '/api/topping/getToppingByID';
export const TOPPING_UPDATE_TOPPING_BY_ID_URL = BASE_URL + '/api/topping/updateToppingggg';
export const TOPPING_DELETE_TOPPING_BY_ID_URL = BASE_URL + '/api/topping/deleteTopping';

export const VOUCHER_GET_ALL_BY_ID_STORE= BASE_URL + '/api/voucher/getAllbyIDStore';
export const VOUCHER_GET_ALL_URL= BASE_URL + '/api/voucher/getAll';
export const VOUCHER_GET_ALL_PRODUCT_URL=BASE_URL + '/api/voucher/getproductbyIDvoucher';
export const VOUCHER_GET_NONE_PRODUCT_URL=BASE_URL + '/api/voucher/noneProductVoucher';
export const VOUCHER_CHANGE_APPLIED_PRODUCT_URL=BASE_URL + '/api/voucher/changeAppliedProduct';
export const VOUCHER_ADD_PRODUCT_URL=BASE_URL + '/api/voucher/addApplyProduct';
export const VOUCHER_UPDATE_URL=BASE_URL + '/api/voucher/updateVoucher';
export const VOUCHER_CREATE_URL=BASE_URL + '/api/voucher/createVoucher';
export const VOUCHER_DELETE_URL=BASE_URL + '/api/voucher/deleteVoucher';


export const CODE_SEND_URL = BASE_URL + '/api/code/randomCode';
export const CODE_CHECK_URL = BASE_URL + '/api/code/checkCode';

//========================================================================
export const PRODUCT_BY_ID_CHITIET = BASE_URL + '/api/products/getProductById1';
export const PRODUCT_BY_JSON_PRODUCT_DETAIL = BASE_URL + '/api/buyer/themGioHang';
export const USER_CART_PRODUCT = BASE_URL + '/api/buyer/loadGioHang';
export const DELETE_PRODUCT_GIOHANG_BY_JSON_BUYER = BASE_URL + '/api/buyer/xoa1SanPhamGioHang';
export const EDIT_COUNT_PRODUCT_GIOHANG_BY_JSON_BUYER = BASE_URL + '/api/buyer/sua1SanPhamGioHang';
export const EDIT_COUNT_TOPPING_GIOHANG_BY_JSON_BUYER = BASE_URL + '/api/buyer/sua1ToppingSanPhamGioHang';
export const DELETE_TOPPING_GIOHANG_BY_JSON_BUYER = BASE_URL + '/api/buyer/xoa1ToppingGioHang';
export const GET_KHUYENMAI_THEO_CUAHANG_SANPHAM = BASE_URL + '/api/voucher/listKhuyenMaiTheoCuaHangSP';
export const GET_KHUYENMAI_THEO_GIOHANG = BASE_URL + '/api/voucher/listKhuyenMaiTheoGioHang';

