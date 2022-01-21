"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("../models/product.model");
require("dotenv/config");
const elasticsearch = require('elasticsearch');
const client = elasticsearch.Client({
    host: 'localhost:9200'
});
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
class ProductService {
    constructor() {
        this.createProduct = (name, salePrice, regularPrice, description, selection, image, branch) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const newProduct = new product_model_1.Product({
                        name,
                        salePrice,
                        regularPrice,
                        description,
                        selection,
                        image,
                        branch
                    });
                    if (await newProduct.save()) {
                        const response = {
                            message: 'Product has been created successfully',
                            success: true,
                            response: newProduct
                        };
                        resolve(response);
                    }
                    const error = {
                        message: 'Failed to create product',
                        success: false,
                    };
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.getAllProducts = (_page, _limit, _sort) => {
            return new Promise(async (resolve, reject) => {
                try {
                    var data;
                    if (_sort === undefined) {
                        data = await product_model_1.Product.find();
                    }
                    else if (_sort === 'bestSelling') {
                        data = await product_model_1.Product.find().sort({ sell_quantity: -1 });
                    }
                    else if (_sort === 'newProduct') {
                        data = await product_model_1.Product.find().sort({ created_at: -1 });
                    }
                    if (data) {
                        if (Number.isNaN(_page) && Number.isNaN(_limit)) {
                            const response = {
                                message: 'All products have been loaded successfully',
                                success: true,
                                response: data
                            };
                            resolve(response);
                        }
                        else {
                            const startIndex = (_page - 1) * _limit;
                            const endIndex = _page * _limit;
                            const page = {};
                            if (endIndex < data.length) {
                                page.next = {
                                    _page: _page + 1,
                                    _limit
                                };
                            }
                            if (startIndex > 0) {
                                page.previous = {
                                    _page: _page - 1,
                                    _limit
                                };
                            }
                            if (startIndex > 0 && endIndex < data.length) {
                                page.current = {
                                    _page,
                                    _limit
                                };
                            }
                            data = data.splice(startIndex, endIndex);
                            const response = {
                                message: 'All products have been loaded successfully',
                                success: true,
                                page,
                                response: data
                            };
                            resolve(response);
                        }
                    }
                    const error = {
                        message: 'Failed to load product',
                        success: false,
                    };
                    reject(error);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.getProductById = (id) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const data = await product_model_1.Product.findOne({ _id: id });
                    if (data) {
                        const response = {
                            message: 'Product has been loaded successfully',
                            success: true,
                            response: data
                        };
                        resolve(response);
                    }
                    const error = {
                        message: 'Failed to load product',
                        success: false,
                    };
                    reject(error);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.createCategory = (title, image, productLst) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const newCategory = new product_model_1.Category({
                        title,
                        image,
                        productLst
                    });
                    if (await newCategory.save()) {
                        const response = {
                            message: 'Category has been created successfully',
                            success: true,
                            response: newCategory
                        };
                        resolve(response);
                    }
                    const error = {
                        message: 'Failed to create category',
                        success: false
                    };
                    resolve(error);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.getAllCategories = (_page, _limit) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let data = await product_model_1.Category.find().select('_id title image').exec();
                    if (data) {
                        console.log(_page, _limit);
                        if (Number.isNaN(_page) && Number.isNaN(_limit)) {
                            const response = {
                                message: 'All categories have been loaded successfully',
                                success: true,
                                response: data
                            };
                            resolve(response);
                        }
                        else {
                            const startIndex = (_page - 1) * _limit;
                            const endIndex = _page * _limit;
                            const page = {};
                            if (endIndex < data.length) {
                                page.next = {
                                    _page: _page + 1,
                                    _limit
                                };
                            }
                            if (startIndex > 0) {
                                page.previous = {
                                    _page: _page - 1,
                                    _limit
                                };
                            }
                            if (startIndex > 0 && endIndex < data.length) {
                                page.current = {
                                    _page,
                                    _limit
                                };
                            }
                            data = data.splice(startIndex, endIndex);
                            const response = {
                                message: 'All categories have been loaded successfully',
                                success: true,
                                page,
                                response: data
                            };
                            resolve(response);
                        }
                    }
                    const error = {
                        message: 'Failed to load categories',
                        success: false
                    };
                    reject(error);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.getCategoryById = (id, _page, _limit) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const data = await product_model_1.Category.findOne({ _id: id }).populate('productLst').exec();
                    if (data) {
                        const startIndex = (_page - 1) * _limit;
                        const endIndex = _page * _limit;
                        const page = {};
                        if (endIndex < data.length) {
                            page.next = {
                                _page: _page + 1,
                                _limit
                            };
                        }
                        if (startIndex > 0) {
                            page.previous = {
                                _page: _page - 1,
                                _limit
                            };
                        }
                        if (startIndex > 0 && endIndex < data.length) {
                            page.current = {
                                _page,
                                _limit
                            };
                        }
                        data.productLst = data.productLst.splice(startIndex, endIndex);
                        const response = {
                            message: 'Category has been loaded successfully',
                            success: true,
                            response: data
                        };
                        resolve(response);
                    }
                    const error = {
                        message: 'Failed to load category',
                        success: false,
                    };
                    reject(error);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.searchProductByTitle = (payload) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let productLst = await product_model_1.Product.find({ $text: { $search: payload } }).limit(3).exec();
                    if (productLst.length > 0) {
                        const response = {
                            message: 'Success!',
                            success: true,
                            response: productLst
                        };
                        resolve(response);
                    }
                    const error = {
                        message: 'Could not find any product matched with input!',
                        success: false,
                    };
                    resolve(error);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.checkout = (userId, details, total_price, payment_status, delivery_fee) => {
            return new Promise(async (resolve, reject) => {
                try {
                    var current = new Date();
                    const newOrder = new product_model_1.Order({
                        userId,
                        details,
                        total_price,
                        payment_status,
                        delivery_fee,
                        order_time: current.toISOString()
                    });
                    if (await newOrder.save()) {
                        const session = await stripe.checkout.sessions.create({
                            success_url: 'http://localhost:3000//checkout/success/',
                            cancel_url: 'http://localhost:3000/checkout/cancel',
                            payment_method_types: ['card'],
                            mode: 'payment',
                            line_items: details.map((detail) => {
                                return {
                                    price_data: {
                                        currency: 'vnd',
                                        product_data: {
                                            name: detail.product
                                        },
                                        unit_amount: detail.total
                                    },
                                    quantity: detail.quantity
                                };
                            })
                        });
                        const response = {
                            message: 'Đơn hàng được tạo thành công!',
                            success: true,
                            response: newOrder,
                            sessionId: session.id
                        };
                        resolve(response);
                    }
                    const error = {
                        message: 'Không thể tạo đơn hàng!',
                        success: false
                    };
                    resolve(error);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.getOrders = (id) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const data = await product_model_1.Order.find({ userId: id }).populate({ path: 'userId' }).populate('details.product').exec();
                    if (data) {
                        const response = {
                            success: true,
                            message: 'Dữ liệu đơn hàng được tải thành công!',
                            response: data
                        };
                        resolve(response);
                    }
                    const error = {
                        success: false,
                        message: 'Không thể tải dữ liệu!'
                    };
                    resolve(error);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.updateOrderStatus = (id, orderStatus) => {
            return new Promise(async (resolve, reject) => {
                try {
                    console.log(orderStatus);
                    const update = {
                        order_status: orderStatus
                    };
                    const data = await product_model_1.Order.findOneAndUpdate({ _id: id }, update, { new: true }).populate({ path: 'userId' }).populate('details.product').exec();
                    if (data) {
                        const response = {
                            success: true,
                            message: 'Trạng thái đơn hàng đã được cập nhật!',
                            response: data
                        };
                        resolve(response);
                    }
                    const error = {
                        success: false,
                        message: 'Không thể cập nhật trạng thái đơn hàng!'
                    };
                    resolve(error);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.getOrderById = (orderId) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const data = await product_model_1.Order.find({ _id: orderId }).populate("userId").populate("details.product").exec();
                    if (data) {
                        const response = {
                            success: true,
                            message: "Lấy thông tin đơn hàng thành công!",
                            response: data
                        };
                        resolve(response);
                    }
                    const error = {
                        success: false,
                        message: 'Không thể lấy thông tin đơn hàng!'
                    };
                    resolve(error);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.eSearch = (payload) => {
            return new Promise(async (resolve, reject) => {
                try {
                }
                catch (error) {
                    reject(error);
                }
            });
        };
    }
}
exports.default = ProductService;
//# sourceMappingURL=product.service.js.map