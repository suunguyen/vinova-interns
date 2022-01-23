"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.Category = exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../../User/models/user.model"));
const Schema = mongoose_1.default.Schema;
const productSchema = new Schema({
    name: {
        type: String
    },
    salePrice: {
        type: Number
    },
    description: {
        type: String
    },
    selection: {
        type: {
            key: {
                type: String
            },
            value: {
                type: [String]
            }
        }
    },
    image: {
        type: [String]
    },
    branch: {
        type: String
    },
    sell_quantity: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    regularPrice: {
        type: Number
    }
});
const categorySchema = new Schema({
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    productLst: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }]
});
const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: user_model_1.default
    },
    details: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number
            },
            total: {
                type: Number
            },
            selected: {
                key: String,
                value: String
            }
        }],
    order_time: {
        type: String
    },
    total_price: {
        type: Number,
    },
    payment_status: {
        type: Boolean,
        default: false
    },
    delivery_fee: {
        type: Number
    },
    order_status: {
        type: String,
        default: "Đang lấy hàng"
    }
});
productSchema.index({ name: 'text' });
exports.Product = mongoose_1.default.model('Product', productSchema);
exports.Category = mongoose_1.default.model('Category', categorySchema);
exports.Order = mongoose_1.default.model('Order', orderSchema);
//# sourceMappingURL=product.model.js.map