const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            },
            color: {
                type: String
            },
            size: {
                type: String
            }
        }
    ],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    shipping: {
        type: String,
        default: 'Đang giao hàng'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", Order);