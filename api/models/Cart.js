const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User'
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
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model("Cart", Cart);