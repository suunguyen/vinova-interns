"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_serializer_1 = require("../serializers/product.serializer");
const product_service_1 = __importDefault(require("../services/product.service"));
require("dotenv/config");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SECRET_ENPOINT;
class ProductController {
    constructor() {
        this.ProductService = new product_service_1.default();
        this.handleCreateProduct = async (req, res) => {
            const data = req.body;
            try {
                const object = await this.ProductService.createProduct(data.name, data.salePrice, data.regularPrice, data.description, data.selection, data.image, data.branch);
                if (object.success) {
                    return res.status(200).json({
                        success: object.success,
                        message: object.message,
                        product: (0, product_serializer_1.serializeGetProduct)(object.response)
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
        this.handleGetAllProducts = async (req, res) => {
            try {
                const _page = parseInt(req.query._page);
                const _limit = parseInt(req.query._limit);
                const _sort = req.query._sort;
                console.log(_sort);
                const object = await this.ProductService.getAllProducts(_page, _limit, _sort);
                if (object.success) {
                    if (object.page !== null) {
                        return res.status(200).json({
                            success: object.success,
                            message: object.message,
                            page: object.page,
                            productLst: object.response.map((obj) => (0, product_serializer_1.serializeGetProduct)(obj))
                        });
                    }
                    return res.status(200).json({
                        success: object.success,
                        message: object.message,
                        productLst: object.response.map((obj) => (0, product_serializer_1.serializeGetProduct)(obj))
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
                        product: (0, product_serializer_1.serializeGetProduct)(object.response)
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
                        category: (0, product_serializer_1.serializeGetCategory)(object.response)
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
                const _page = parseInt(req.query._page);
                const _limit = parseInt(req.query._limit);
                const object = await this.ProductService.getAllCategories(_page, _limit);
                if (object.success) {
                    if (object.page !== null) {
                        return res.status(200).json({
                            message: object.message,
                            success: object.success,
                            page: object.page,
                            categories: object.response
                        });
                    }
                    return res.status(200).json({
                        message: object.message,
                        success: object.success,
                        categories: object.response
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
                const _page = parseInt(req.query._page);
                const _limit = parseInt(req.query._limit);
                const categoryId = req.query.categoryId;
                const object = await this.ProductService.getCategoryById(categoryId, _page, _limit);
                if (object.success) {
                    return res.status(200).json({
                        success: object.success,
                        message: object.message,
                        category: (0, product_serializer_1.serializeGetCategory)(object.response)
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
        this.handleSearchProductByTitle = async (req, res) => {
            try {
                const payload = req.body.payload;
                const object = await this.ProductService.searchProductByTitle(payload);
                if (object.success) {
                    return res.status(200).json({
                        message: object.message,
                        success: object.success,
                        productLst: object.response
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
        this.handleCheckout = async (req, res) => {
            try {
                const data = req.body;
                const object = await this.ProductService.checkout(data.userId, data.details, data.total_price, data.payment_status, data.delivery_fee);
                if (object.success) {
                    return res.status(200).json({
                        message: object.message,
                        success: object.success,
                        order: object.response,
                        sessionid: object.sessionId
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
        this.handleGetOrders = async (req, res) => {
            try {
                const id = req.query.userId;
                const object = await this.ProductService.getOrders(id);
                if (object.success) {
                    return res.status(200).json({
                        message: object.message,
                        success: object.success,
                        orderLst: object.response
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
        this.handleUpdatePaymentStatus = async (req, res) => {
            try {
                const payload = req.body;
                const sig = req.headers['stripe-signature'];
                let event;
                try {
                    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
                }
                catch (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'Bad Request'
                    });
                }
                if (event.type === 'checkout.session.async_payment_succeeded') {
                    const session = event.data.object;
                    return res.status(200).json({
                        success: true
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
        this.handleUpdateOrderStatus = async (req, res) => {
            try {
                const id = req.query._id;
                const orderStatus = req.body.orderStatus;
                console.log(orderStatus);
                const object = await this.ProductService.updateOrderStatus(id, orderStatus);
                if (object.success) {
                    return res.status(200).json({
                        message: object.message,
                        success: object.success,
                        order: object.response
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
        this.handleGetOrderById = async (req, res) => {
            try {
                const orderId = req.query.orderId;
                const object = await this.ProductService.getOrderById(orderId);
                if (object.success) {
                    return res.status(200).json({
                        message: object.message,
                        success: object.success,
                        order: object.response
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
        this.handleESearch = async (req, res) => {
            try {
                const payload = req.body;
                const object = await this.ProductService.eSearch(payload);
                if (object.success) {
                    return res.status(200).json({
                        message: object.message,
                        success: object.success,
                        productLst: object.response
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
//# sourceMappingURL=product.controller.js.map