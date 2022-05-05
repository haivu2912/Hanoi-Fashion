const userRouter = require('./user');
const authRouter = require('./auth');
const productRouter = require('./product');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const stripeRouter = require('./stripe');
const wishListRouter = require('./wishlist');
const staffRouter = require('./staff');
const receiveRouter = require('./receive');
const reportRouter = require('./report');
const categoryRouter = require('./category');

function route(app) {
    app.use('/api/user', userRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/product', productRouter);
    app.use('/api/cart', cartRouter);
    app.use('/api/wishlist', wishListRouter)
    app.use('/api/order', orderRouter);
    app.use('/api/checkout', stripeRouter);
    app.use('/api/staff', staffRouter);
    app.use('/api/receive', receiveRouter);
    app.use('/api/report', reportRouter);
    app.use('/api/category', categoryRouter);
}

module.exports = route;