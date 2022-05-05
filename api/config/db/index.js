const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
async function connect() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('success');
    }catch(e) {
        console.log('fail');
    }
}

module.exports = {connect};