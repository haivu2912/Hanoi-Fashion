const Cart = require('../models/Cart');

class CartController {
    // [GET] /find/:id
    async findUserCart(req, res, next) {
        try{
            const cart = await Cart.findOne({userId: req.params.userId}).populate({
                path: 'products',
                populate: {
                    path: 'productId'
                }
            });
            res.status(200).json(cart);
        }catch(err) {
            res.status(500).json(err);
        }
    }

     // [GET] /
     async findAllCart(req, res, next) {
        try{
            const carts = await Cart.find().populate('userId').populate({
                path: 'products',
                populate: {
                    path: 'productId'
                }
            });
            res.status(200).json(carts);
        }catch(err) {
            res.status(500).json(err);
        }
    }

    // [POST] create/
    async create(req, res) {
        const newCart = new Cart(req.body);
        try{
            const savedCart = await newCart.save();
            res.status(200).json(savedCart);
        }catch(err) {
            res.status(500).json(err);
        }
    }

    //[PUT] /update/:id
    async update(req, res, next) {
        try{
            const updateCart =  await Cart.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            })
            res.status(200).json(updateCart);
        }catch(err) {
            res.status(500).json(err)
        }
    }

    // [DELETE] /delete/:id
    async delete(req, res, next) {
        try{
            await Cart.findByIdAndDelete(req.params.id);
            res.status(200).json('Cart has been delete');
        }catch(err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new CartController;