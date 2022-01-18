"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_serializer_1 = require("../serializers/product.serializer");
const product_service_1 = __importDefault(require("../services/product.service"));
class ProductController {
    constructor() {
        this.ProductService = new product_service_1.default();
        this.handleCreateProduct = async (req, res) => {
            const data = req.body;
            try {
                const object = await this.ProductService.createProduct(data.name, data.price, data.description, data.selection, data.image);
                if (object) {
                    return res.status(200).json({
                        success: true,
                        product: (0, product_serializer_1.serializeGetProduct)(object)
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: 'Bad Request'
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal Server Error'
                });
            }
        };
        this.handleGetAllProducts = async (req, res) => {
            try {
                const object = await this.ProductService.getAllProducts();
                if (object.success) {
                    return res.status(200).json({
                        success: object.success,
                        message: object.message,
                        productLst: object.product.map((obj) => (0, product_serializer_1.serializeGetProduct)(obj))
                    });
                }
                return res.status(400).json({
                    success: object.success,
                    message: object.message
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal Server Error'
                });
            }
        };
        this.handleGetProductById = async (req, res) => {
            try {
                const productId = req.query.productId;
                const object = await this.ProductService.getProductById(productId);
                if (object.success) {
                    return res.status(200).json({
                        success: object.success,
                        message: object.message,
                        product: (0, product_serializer_1.serializeGetProduct)(object.product)
                    });
                }
                return res.status(400).json({
                    success: object.success,
                    message: object.message
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal Server Error'
                });
            }
        };
        this.handleCreateCategory = async (req, res) => {
            const data = req.body;
            try {
                const object = await this.ProductService.createCategory(data.title, data.image, data.productLst);
                if (object.success) {
                    return res.status(200).json({
                        success: object.success,
                        message: object.message,
                        category: (0, product_serializer_1.serializeGetCategory)(object.category)
                    });
                }
                return res.status(400).json({
                    success: object.success,
                    message: object.message,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal Server Error'
                });
            }
        };
        this.handleGetAllCategories = async (req, res) => {
            try {
                const object = await this.ProductService.getAllCategories();
                if (object.success) {
                    return res.status(200).json({
                        message: object.message,
                        success: object.success,
                        categoryLst: object.category.map((obj) => (0, product_serializer_1.serializeGetCategory)(object.category))
                    });
                }
                return res.status(400).json({
                    success: object.success,
                    message: object.message
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal Server Error'
                });
            }
        };
        this.handleGetCategoryById = async (req, res) => {
            try {
                const categoryId = req.query.categoryId;
                const object = await this.ProductService.getCategoryById(categoryId);
                if (object.success) {
                    return res.status(200).json({
                        success: object.success,
                        message: object.message,
                        category: (0, product_serializer_1.serializeGetCategory)(object.category)
                    });
                }
                return res.status(400).json({
                    success: object.success,
                    message: object.message
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal Server Error'
                });
            }
        };
    }
}
exports.default = ProductController;
//# sourceMappingURL=product.controler.js.map