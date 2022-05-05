const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Receive = new Schema({
    provider: {
        type: String,
    },
    products: [
        {
            name: {
                type: String,
                required: true
            },
            img: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1
            },
            color: {
                type: Array
            },
            size: {
                type: Array
            },
            price: {
                type: Number
            },
            inStore: {
                type: Boolean,
                default: false
            }
        }
    ],
    amount: {
        type: Number
    },
    status: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Receive", Receive);