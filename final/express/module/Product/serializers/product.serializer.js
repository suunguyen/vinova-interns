"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeGetOrder = exports.serializeGetCategory = exports.serializeGetProduct = void 0;
function serializeGetProduct(product) {
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
    };
}
exports.serializeGetProduct = serializeGetProduct;
function serializeGetCategory(category) {
    return {
        _id: category._id,
        title: category.title,
        image: category.image,
        productLst: category.productLst,
    };
}
exports.serializeGetCategory = serializeGetCategory;
function serializeGetOrder(model) {
    return {
        orderId: model._id,
        userId: model.userId,
        details: model.details,
        order_time: model.order_time,
        total_price: model.total_price,
        payment_status: model.payment_status,
        delivery_fee: model.delivery_fee,
        order_status: model.order_status
    };
}
exports.serializeGetOrder = serializeGetOrder;
//# sourceMappingURL=product.serializer.js.map