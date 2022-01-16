import { Request, Response } from 'express'
import { productDto, categoryDto, orderDto } from "../DTO/product.dto";
import { serializeGetProduct, serializeGetCategory, serializeGetOrder } from '../serializers/product.serializer';
import ProductService from "../services/product.service";

export default class ProductController {
    public ProductService: ProductService = new ProductService();
    handleCreateProduct = async (req: Request, res: Response): Promise<Response> => {
        const data: productDto = req.body;
        try {
            const object = await this.ProductService.createProduct(data.name, data.salePrice, data.regularPrice, data.description, data.selection, data.image, data.branch);
            if (object.success) {
                return res.status(200).json({
                    success: object.success,
                    message: object.message,
                    product: serializeGetProduct(object.response)
                })
            }
            return res.status(400).json({
                success: object.success,
                message: object.message
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }
    handleGetAllProducts = async (req: Request, res: Response): Promise<Response> => {
        try {
            const _page: number = parseInt(req.query._page as string);
            const _limit: number = parseInt(req.query._limit as string);
            const _sort: string = req.query._sort as string;
            console.log(_sort);
            const object = await this.ProductService.getAllProducts(_page, _limit, _sort);
            if (object.success) {
                if (object.page !== null) {
                    return res.status(200).json({
                        success: object.success,
                        message: object.message,
                        page: object.page,
                        productLst: object.response.map((obj: any) => serializeGetProduct(obj))
                    })
                }
                return res.status(200).json({
                    success: object.success,
                    message: object.message,
                    productLst: object.response.map((obj: any) => serializeGetProduct(obj))
                })
            }
            return res.status(400).json({
                success: object.success,
                message: object.message
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }
    handleGetProductById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const productId: string = req.query.productId as any;
            const object = await this.ProductService.getProductById(productId);
            if (object.success) {
                return res.status(200).json({
                    success: object.success,
                    message: object.message,
                    product: serializeGetProduct(object.response)
                })
            }
            return res.status(400).json({
                success: object.success,
                message: object.message
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }
    handleCreateCategory = async (req: Request, res: Response): Promise<Response> => {
        const data: categoryDto = req.body;
        try {
            const object = await this.ProductService.createCategory(data.title, data.image, data.productLst);
            if (object.success) {
                return res.status(200).json({
                    success: object.success,
                    message: object.message,
                    category: serializeGetCategory(object.response)
                })
            }
            return res.status(400).json({
                success: object.success,
                message: object.message,
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }
    handleGetAllCategories = async (req: Request, res: Response): Promise<Response> => {
        try {
            const _page: number = parseInt(req.query._page as string);
            const _limit: number = parseInt(req.query._limit as string);
            const object = await this.ProductService.getAllCategories(_page, _limit);
            if (object.success) {
                if (object.page !== null) {
                    return res.status(200).json({
                        message: object.message,
                        success: object.success,
                        page: object.page,
                        categories: object.response
                    })
                }
                return res.status(200).json({
                    message: object.message,
                    success: object.success,
                    categories: object.response
                })
            }
            return res.status(400).json({
                success: object.success,
                message: object.message
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }
    handleGetCategoryById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const _page: number = parseInt(req.query._page as string);
            const _limit: number = parseInt(req.query._limit as string);
            const categoryId: string = req.query.categoryId as any;
            const object = await this.ProductService.getCategoryById(categoryId, _page, _limit);
            if (object.success) {
                return res.status(200).json({
                    success: object.success,
                    message: object.message,
                    category: serializeGetCategory(object.response)
                })
            }
            return res.status(400).json({
                success: object.success,
                message: object.message
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }
    handleSearchProductByTitle = async (req: Request, res: Response): Promise<Response> => {
        try {
            const payload: string = req.body.payload;
            const object = await this.ProductService.searchProductByTitle(payload);
            if (object.success) {
                return res.status(200).json({
                    message: object.message,
                    success: object.success,
                    productLst: object.response
                })
            }
            return res.status(400).json({
                success: object.success,
                message: object.message
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }
    handleCheckout = async (req: Request, res: Response): Promise<Response> => {
        try {
            const data: orderDto = req.body;
            const object = await this.ProductService.checkout(data.userId, data.details, data.total_price, data.payment_status, data.delivery_fee);
            if (object.success) {
                return res.status(200).json({
                    message: object.message,
                    success: object.success,
                    order: object.response,
                    sessionid: object.sessionId
                })
            }
            return res.status(400).json({
                success: object.success,
                message: object.message
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }
    handleGetOrders = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id: string = req.query.userId as string;
            const object = await this.ProductService.getOrders(id);
            if (object.success) {
                return res.status(200).json({
                    message: object.message,
                    success: object.success,
                    orderLst: object.response
                })
            }
            return res.status(400).json({
                success: object.success,
                message: object.message
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }

    handleUpdatePaymentStatus = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id: string = req.query.orderId as string;
            const object = await this.ProductService.updatePaymentStatus(id);
            if (object.success) {
                return res.status(200).json({
                    message: object.message,
                    success: object.success,
                    orderLst: object.response
                })
            }
            return res.status(400).json({
                success: object.success,
                message: object.message
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }

    handleUpdateOrderStatus = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id: string = req.query._id as string;
            const orderStatus = req.body.orderStatus;
            const object = await this.ProductService.updateOrderStatus(id, orderStatus);
            if (object.success) {
                return res.status(200).json({
                    message: object.message,
                    success: object.success,
                    order: object.response
                })
            }
            return res.status(400).json({
                success: object.success,
                message: object.message
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }
}
