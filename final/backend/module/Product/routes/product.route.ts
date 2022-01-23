import express from 'express'
import ProductController from '../controllers/product.controller';

const productController = new ProductController();
const productRouter = express.Router();

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

export default productRouter;
