const User = require('../models/User');
const CryptoJS = require('crypto-js');

class UserController {
    // [GET] /find/:id
    async findUser(req, res, next) {
        try{
            const user = await User.findById(req.params.id);
            const {password, ...others} = user._doc;
            res.status(200).json(others);
        }catch(err) {
            res.status(500).json(err);
        }
    }

    // [GET] /find
    async findAllUser(req, res, next) {
        const query = req.query.new;
        try{
            const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find();
            res.status(200).json(users);
        }catch(err) {
            res.status(500).json(err);
        }
    }

    // [PUT] /update/:id
    async update(req, res, next) {
        if(req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
        }

        try{
            const updateUser =  await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            })
            res.status(200).json(updateUser)
        }catch(err) {
            res.status(500).json(err)
        }
    }

    // [DELETE] /delete/:id
    async delete(req, res, next) {
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('User has been delete');
        }catch(err) {
            res.status(500).json(err);
        }
    }

    //[PUT] /stats
    async showUserStats(req, res, next) {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

        try{
            const data = await User.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: lastYear
                        }
                    }
                },

                {
                    $project: {
                        month: {
                            $month: '$createdAt'
                        }
                    }
                },

                {
                    $group: {
                        _id: '$month',
                        total: {
                            $sum: 1
                        }
                    }
                }
            ])
            res.status(200).json(data);
        }catch(err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new UserController;