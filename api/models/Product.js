const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
    },
    size: {
        type: Array,
    },
    color: {
        type: Array,
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    sold: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", Product);