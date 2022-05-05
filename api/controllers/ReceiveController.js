const Receive = require('../models/Receive');

class ReceiveController {
    // [GET] /find/:id
    async findReceive(req, res, next) {
        try{
            const receive = await Receive.findById(req.params.id)
            res.status(200).json(receive);
        }catch(err) {
            res.status(500).json(err);
        }
    }

     // [GET] /
     async findAllReceive(req, res, next) {
        try{
            const receives = await Receive.find();
            res.status(200).json(receives);
        }catch(err) {
            res.status(500).json(err);
        }
    }

    // [POST] /
    async create(req, res) {
        const newReceive = new Receive(req.body);
        try{
            const savedReceive = await newReceive.save({});
            res.status(200).json(savedReceive);
        }catch(err) {
            res.status(500).json(err);
        }
    }

    // [PATCH] /update/:id
    async update(req, res, next) {
        try{
            const updateReceive =  await Receive.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            })
            res.status(200).json(updateReceive);
        }catch(err) {
            res.status(500).json(err)
        }
    }

    // [DELETE] /delete/:id
    async delete(req, res, next) {
        try{
            await Receive.findByIdAndDelete(req.params.id);
            res.status(200).json('Receive has been delete');
        }catch(err) {
            res.status(500).json(err);
        }
    }

    async incomeStats(req, res, next) {
        const productId = req.query.pid;
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

        try {
            const income = await Receive.aggregate([
                {
                    $match: {
                        createdAt: { $gte: previousMonth },
                    },
                },
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        pays: "$amount",
                    },
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: "$pays" },
                    },
                },
            ]);
            res.status(200).json(income);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new ReceiveController;