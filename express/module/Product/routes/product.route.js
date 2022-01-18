"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const productController = new product_controller_1.default();
const productRouter = express_1.default.Router();
productRouter.post('/createProduct', productController.handleCreateProduct);
productRouter.get('/getAllProducts', productController.handleGetAllProducts);
productRouter.get('/getProduct', productController.handleGetProductById);
productRouter.post('/createCategory', productController.handleCreateCategory);
productRouter.get('/getAllCategories', productController.handleGetAllCategories);
productRouter.get('/getAllProductsByCateId', productController.handleGetCategoryById);
productRouter.post('/searchProduct', productController.handleSearchProductByTitle);
productRouter.post('/checkout', productController.handleCheckout);
productRouter.get('/getOrders', productController.handleGetOrders);
productRouter.post('/booking/status', productController.handleUpdatePaymentStatus);
productRouter.put('/updateOrderStatus', productController.handleUpdateOrderStatus);
productRouter.get('/getOrderById', productController.handleGetOrderById);
exports.default = productRouter;
//# sourceMappingURL=product.route.js.map