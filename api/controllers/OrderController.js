const Order = require('../models/Order');

class OrderController {
    async findUserOrder(req, res, next) {
        try {
            const order = await Order.find({ userId: req.params.userId }).populate({
                path: 'products',
                populate: {
                    path: 'productId'
                }
            });
            res.status(200).json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    }


    // [GET] /find/:id
    async findOrder(req, res, next) {
        try {
            const order = await Order.findById(req.params.id);
            res.status(200).json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [GET] /
    async findAllOrder(req, res, next) {
        const query = req.query.new;
        try {
            // const orders = query ? await Order.find().populate('userId').populate({
            //     path: 'products',
            //     populate: {
            //         path: 'productId'
            //     }
            // }).sort({ _id: -1 }).limit(5) : await User.find().populate('userId').populate({
            //     path: 'products',
            //     populate: {
            //         path: 'productId'
            //     }
            // });
            if (query) {
                const orders = await Order.find().populate('userId').populate({
                    path: 'products',
                    populate: {
                        path: 'productId'
                    }
                }).sort({ _id: -1 }).limit(5);
                res.status(200).json(orders);
            } else {
                const orders = await Order.find().populate('userId').populate({
                    path: 'products',
                    populate: {
                        path: 'productId'
                    }
                });
                res.status(200).json(orders);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [POST] /
    async create(req, res) {
        const newOrder = new Order(req.body);
        try {
            const savedOrder = await newOrder.save({});
            res.status(200).json(savedOrder);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [PUT] /update/:id
    async update(req, res, next) {
        try {
            const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            })
            res.status(200).json(updateOrder)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    // [DELETE] /delete/:id
    async delete(req, res, next) {
        try {
            await Order.findByIdAndDelete(req.params.id);
            res.status(200).json('Order has been delete');
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async incomeStats(req, res, next) {
        const productId = req.query.pid;
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

        try {
            const income = await Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: previousMonth },
                        ...(productId && {
                            products: { $elemMatch: { productId } },
                        }),
                    },
                },
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        sales: "$amount",
                    },
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: "$sales" },
                    },
                },
            ]);
            res.status(200).json(income);
        } catch (err) {
            res.status(500).json(err);
        }
        // const productId = req.query.pid;
        // const date = new Date();
        // const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        // //const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

        // try {
        //     const income = await Order.aggregate([
        //         {
        //             $match: {
        //                 createdAt: { $gte: lastMonth },
        //                 ...(productId && {
        //                     products: { $elemMatch: { productId } },
        //                 }),
        //             },
        //         },
        //         {
        //             $project: {
        //                 month: { $month: "$createdAt" },
        //                 sales: "$amount",
        //             },
        //         },
        //         {
        //             $group: {
        //                 _id: "$month",
        //                 total: { $sum: "$sales" },
        //             },
        //         },
        //     ]);
        //     res.status(200).json(income);
        // } catch (err) {
        //     res.status(500).json(err);
        // }
    }

    async saleStats(req, res, next) {
        // const productId = req.query.pid;
        // const date = new Date();
        // const lastMonth = new Date(new Date().setMonth(date.getMonth() - 1));
        // //const lastMonth = new Date(date.setMonth(date.getMonth - 1));
        // const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth - 1));

        // try {
        //     const sale = await Order.aggregate([
        //         {
        //             $match: {
        //                 createdAt: { $gte: previousMonth },
        //                 ...(productId && {
        //                     products: { $elemMatch: { productId } },
        //                 }),
        //             },
        //         },
        //         {
        //             $project: {
        //                 month: { $month: "$createdAt" },
        //                 sales: "$product.amount",
        //             },
        //         },
        //         {
        //             $group: {
        //                 _id: "$month",
        //                 total: { $sum: "$sales" },
        //             },
        //         },
        //     ])
        //     res.status(200).json(sale);
        // } catch (err) {
        //     res.status(500).json(err);
        // }
    }

    async monthStats(req, res, next) {
        const monthWantSearch = req.query.month;
        const searchMonth = new Date();
        searchMonth.setMonth(monthWantSearch);
        // const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        // const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
        try {
            const stats = await Order.aggregate([
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        sales: "$amount",
                        products: "$products",

                    },
                },
                {
                    $match: {
                        month: { $eq: searchMonth.getMonth() }
                    }
                },
                // {
                //     $group: {
                //         _id: "$month",
                //         total: { $sum: "$sales" },
                //     },
                // },
            ])
            res.status(200).json(stats);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new OrderController;