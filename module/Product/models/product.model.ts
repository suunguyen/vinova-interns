import mongoose from 'mongoose';
import User from '../../User/models/user.model';

const Schema = mongoose.Schema;

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
})
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
})

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: User
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
})
productSchema.index({ name: 'text' });
export const Product = mongoose.model('Product', productSchema);
export const Category = mongoose.model('Category', categorySchema);
export const Order = mongoose.model('Order', orderSchema);