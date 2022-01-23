import { Date } from "mongoose"

interface IProductDB {
    _id: string,
    name: string,
    salePrice: number,
    regularPrice: number,
    branch: string,
    description: string,
    selection: Array<object>,
    image: Array<string>,
    sell_quantity: number,
}

interface IOrderDB {
    _id: string,
    userId: string,
    details: Array<object>,
    order_time: Object,
    total_price: Number,
    payment_status: Boolean,
    delivery_fee: Number,
    order_status: string
}

interface ICategoryDB {
    _id: string,
    title: string,
    image: string,
    productLst: Array<object>
}

interface IOrder {
    orderId: string,
    userId: string,
    details: Array<object>,
    order_time: Object,
    total_price: Number,
    payment_status: Boolean,
    delivery_fee: Number,
    order_status: string
}

interface IProduct {
    _id: string,
    name: string,
    salePrice: number,
    regularPrice: number,
    branch: string,
    description: string,
    selection: Array<object>,
    image: Array<string>,
    sell_quantity: number
}

interface ICategory {
    _id: string,
    title: string,
    image: string,
    productLst: Array<object>
}

export function serializeGetProduct(product: IProductDB): IProduct {
    return {
        _id: product._id,
        name: product.name,
        salePrice: product.salePrice,
        regularPrice: product.regularPrice,
        branch: product.branch,
        description: product.description,
        selection: product.selection,
        image: product.image,
        sell_quantity: product.sell_quantity,
    }
}

export function serializeGetCategory(category: ICategoryDB): ICategory {
    return {
        _id: category._id,
        title: category.title,
        image: category.image,
        productLst: category.productLst,
    }
}

export function serializeGetOrder(model: IOrderDB): IOrder {
    return {
        orderId: model._id,
        userId: model.userId,
        details: model.details,
        order_time: model.order_time,
        total_price: model.total_price,
        payment_status: model.payment_status,
        delivery_fee: model.delivery_fee,
        order_status: model.order_status
    }
}