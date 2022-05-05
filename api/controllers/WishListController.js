const WishList = require('../models/WishList');

class WishListController {
    // [GET] /find/:id
    async findUserWishList(req, res, next) {
        try{
            const wishlist = await WishList.findOne({userId: req.params.userId}).populate({
                path: 'products',
                populate: {
                    path: 'productId'
                }
            });
            res.status(200).json(wishlist);
        }catch(err) {
            res.status(500).json(err);
        }
    }

    // [GET] /
    async findAllWishList(req, res, next) {
        try{
            const WishLists = await WishList.find().populate('userId').populate({
                path: 'products',
                populate: {
                    path: 'productId'
                }
            });
            res.status(200).json(WishLists);
        }catch(err) {
            res.status(500).json(err);
        }
    }

    // [POST] create/
    async create(req, res) {
        const newWishList = new WishList(req.body);
        try{
            const savedWishList = await newWishList.save();
            res.status(200).json(savedWishList);
        }catch(err) {
            res.status(500).json(err);
        }
    }

    //[PUT] /update/:id
    async update(req, res, next) {
        try{
            const updateWishList =  await WishList.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            })
            res.status(200).json(updateWishList);
        }catch(err) {
            res.status(500).json(err)
        }
    }

    // [DELETE] /delete/:id
    async delete(req, res, next) {
        try{
            await WishList.findByIdAndDelete(req.params.id);
            res.status(200).json('Wishlist has been delete');
        }catch(err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new WishListController;