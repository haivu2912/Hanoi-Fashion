const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    img: {
        type: String,
    },
    title: {
        type: String,
    },
    cat: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Category", Category);