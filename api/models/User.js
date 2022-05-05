const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", User);