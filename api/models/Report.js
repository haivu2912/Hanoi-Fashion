const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Report = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    report: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Report", Report);