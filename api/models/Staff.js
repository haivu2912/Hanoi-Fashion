const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Staff = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    shift: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Staff", Staff);