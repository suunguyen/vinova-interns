import { Document } from 'mongoose';
import { Product, Category, Order } from "../models/product.model";
import 'dotenv/config'
const elasticsearch = require('elasticsearch');
const client = elasticsearch.Client({
    host: 'localhost:9200'
});

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

interface ISuccess<T extends Document> {
    message: string,
    success: boolean,
    page?: object,
    response: T,
    sessionId?: string
}

interface IError {
    message: string,
    success: boolean
}

interface IPagination {
    next?: object,
    current?: object,
    previous?: object
}

export default class ProductService {
    createProduct = (name: string, salePrice: number, regularPrice: number, description: string, selection: object, image: Array<string>, branch: string) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const newProduct = new Product({
                    name,
                    salePrice,
                    regularPrice,
                    description,
                    selection,
                    image,
                    branch
                })
                if (await newProduct.save()) {
                    const response: ISuccess<Document> = {
                        message: 'Product has been created successfully',
                        success: true,
                        response: newProduct
                    }
                    resolve(response);
                }
                const error: IError = {
                    message: 'Failed to create product',
                    success: false,
                }
            } catch (error) {
                reject(error);
            }
        })
    }
    getAllProducts = (_page: number, _limit: number, _sort: string) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                var data;

                if (_sort === undefined) {
                    data = await Product.find();
                } else if (_sort === 'bestSelling') {
                    data = await Product.find().sort({ sell_quantity: -1 });
                } else if (_sort === 'newProduct') {
                    data = await Product.find().sort({ created_at: -1 });
                }

                if (data) {
                    if (Number.isNaN(_page) && Number.isNaN(_limit)) {
                        const response: ISuccess<Document> = {
                            message: 'All products have been loaded successfully',
                            success: true,
                            response: data
                        }
                        resolve(response);
                    } else {
                        // pagnination
                        const startIndex = (_page - 1) * _limit;
                        const endIndex = _page * _limit;

                        const page: IPagination = {};

                        if (endIndex < data.length) {
                            page.next = {
                                _page: _page + 1,
                                _limit
                            }
                        }

                        if (startIndex > 0) {
                            page.previous = {
                                _page: _page - 1,
                                _limit
                            }
                        }

                        if (startIndex > 0 && endIndex < data.length) {
                            page.current = {
                                _page,
                                _limit
                            }
                        }
                        data = data.splice(startIndex, endIndex);

                        const response: ISuccess<Document> = {
                            message: 'All products have been loaded successfully',
                            success: true,
                            page,
                            response: data
                        }
                        resolve(response);
                    }
                }
                const error: IError = {
                    message: 'Failed to load product',
                    success: false,
                }
                reject(error);
            } catch (error) {
                reject(error);
            }
        })
    }

    getProductById = (id: string) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const data = await Product.findOne({ _id: id });
                if (data) {
                    const response: ISuccess<Document> = {
                        message: 'Product has been loaded successfully',
                        success: true,
                        response: data
                    }
                    resolve(response);
                }
                const error: IError = {
                    message: 'Failed to load product',
                    success: false,
                }
                reject(error);
            } catch (error) {
                reject(error);
            }
        })
    }

    createCategory = (title: string, image: string, productLst: Array<object>) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const newCategory = new Category({
                    title,
                    image,
                    productLst
                });
                if (await newCategory.save()) {
                    const response: ISuccess<Document> = {
                        message: 'Category has been created successfully',
                        success: true,
                        response: newCategory
                    }
                    resolve(response);
                }
                const error: IError = {
                    message: 'Failed to create category',
                    success: false
                }
                resolve(error);
            } catch (error) {
                reject(error);
            }
        })
    }
    getAllCategories = (_page: number, _limit: number) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let data = await Category.find().select('_id title image').exec();
                if (data) {
                    console.log(_page, _limit);
                    if (Number.isNaN(_page) && Number.isNaN(_limit)) {
                        const response: ISuccess<Document> = {
                            message: 'All categories have been loaded successfully',
                            success: true,
                            response: data
                        }
                        resolve(response);
                    } else {
                        // pagnination
                        const startIndex = (_page - 1) * _limit;
                        const endIndex = _page * _limit;

                        const page: IPagination = {};

                        if (endIndex < data.length) {
                            page.next = {
                                _page: _page + 1,
                                _limit
                            }
                        }

                        if (startIndex > 0) {
                            page.previous = {
                                _page: _page - 1,
                                _limit
                            }
                        }

                        if (startIndex > 0 && endIndex < data.length) {
                            page.current = {
                                _page,
                                _limit
                            }
                        }
                        data = data.splice(startIndex, endIndex);
                        const response: ISuccess<Document> = {
                            message: 'All categories have been loaded successfully',
                            success: true,
                            page,
                            response: data
                        }
                        resolve(response);
                    }

                }
                const error: IError = {
                    message: 'Failed to load categories',
                    success: false
                }
                reject(error);
            } catch (error) {
                reject(error);
            }
        })
    }
    getCategoryById = (id: string, _page: number, _limit: number) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const data = await Category.findOne({ _id: id }).populate('productLst').exec();
                if (data) {
                    // pagnination
                    const startIndex = (_page - 1) * _limit;
                    const endIndex = _page * _limit;

                    const page: IPagination = {};

                    if (endIndex < data.length) {
                        page.next = {
                            _page: _page + 1,
                            _limit
                        }
                    }

                    if (startIndex > 0) {
                        page.previous = {
                            _page: _page - 1,
                            _limit
                        }
                    }

                    if (startIndex > 0 && endIndex < data.length) {
                        page.current = {
                            _page,
                            _limit
                        }
                    }
                    data.productLst = data.productLst.splice(startIndex, endIndex);
                    const response: ISuccess<Document> = {
                        message: 'Category has been loaded successfully',
                        success: true,
                        response: data
                    }
                    resolve(response);
                }
                const error: IError = {
                    message: 'Failed to load category',
                    success: false,
                }
                reject(error);
            } catch (error) {
                reject(error);
            }
        })
    }

    searchProductByTitle = (payload: string) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let productLst = await Product.find({ $text: { $search: payload } }).limit(3).exec();
                if (productLst.length > 0) {
                    const response: ISuccess<Document> = {
                        message: 'Success!',
                        success: true,
                        response: productLst
                    }
                    resolve(response);
                }
                const error: IError = {
                    message: 'Could not find any product matched with input!',
                    success: false,
                }
                resolve(error);
            } catch (error) {
                reject(error);
            }
        })
    }
    checkout = (userId: string, details: Array<object>, total_price: number, payment_status: boolean, delivery_fee: number) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                var current = new Date();
                const newOrder = new Order({
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
                        line_items: details.map((detail: any) => {
                            return {
                                price_data: {
                                    currency: 'vnd',
                                    product_data: {
                                        name: detail.product
                                    },
                                    unit_amount: detail.total
                                },
                                quantity: detail.quantity
                            }
                        })
                    });
                    const response: ISuccess<Document> = {
                        message: 'Đơn hàng được tạo thành công!',
                        success: true,
                        response: newOrder,
                        sessionId: session.id
                    }
                    resolve(response);
                }
                const error: IError = {
                    message: 'Không thể tạo đơn hàng!',
                    success: false
                }
                resolve(error);
            } catch (error) {
                reject(error);
            }
        })
    }
    getOrders = (id: string) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const data = await Order.find({ userId: id }).populate({ path: 'userId' }).populate('details.product').exec();
                if (data) {
                    const response: ISuccess<Document> = {
                        success: true,
                        message: 'Dữ liệu đơn hàng được tải thành công!',
                        response: data
                    }
                    resolve(response);
                }
                const error: IError = {
                    success: false,
                    message: 'Không thể tải dữ liệu!'
                }
                resolve(error);
            } catch (error) {
                reject(error);
            }
        })
    }

    updateOrderStatus = (id: string, orderStatus: string) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                console.log(orderStatus);
                const update = {
                    order_status: orderStatus
                }
                const data = await Order.findOneAndUpdate({ _id: id }, update, { new: true }).populate({ path: 'userId' }).populate('details.product').exec();
                if (data) {
                    const response: ISuccess<Document> = {
                        success: true,
                        message: 'Trạng thái đơn hàng đã được cập nhật!',
                        response: data
                    }
                    resolve(response);
                }
                const error: IError = {
                    success: false,
                    message: 'Không thể cập nhật trạng thái đơn hàng!'
                }
                resolve(error);
            } catch (error) {
                reject(error);
            }
        })
    }

    getOrderById = (orderId: string) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const data = await Order.find({ _id: orderId }).populate("userId").populate("details.product").exec();
                if (data) {
                    const response: ISuccess<Document> = {
                        success: true,
                        message: "Lấy thông tin đơn hàng thành công!",
                        response: data
                    }
                    resolve(response);
                }
                const error: IError = {
                    success: false,
                    message: 'Không thể lấy thông tin đơn hàng!'
                }
                resolve(error);
            } catch (error) {
                reject(error);
            }
        })
    }
    eSearch = (payload: string) => {
        return new Promise<any>(async (resolve, reject) => {
            try {

            } catch (error) {
                reject(error);
            }
        })
    }
}