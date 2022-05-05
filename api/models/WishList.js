const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishList = new Schema({
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
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model("WishList", WishList);