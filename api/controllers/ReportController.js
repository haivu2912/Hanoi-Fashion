const Report = require('../models/Report');

class ReportController {
    async findUserReport(req, res, next) {
        try{
            const report = await Report.find({userId: req.params.userId}).populate('userId').populate('productId');
            res.status(200).json(report);
        }catch(err) {
            res.status(500).json(err);
        }
    }

    // [GET] /
    async findAllReport(req, res, next) {
        try {
            const reports = await Report.find().populate('userId').populate('productId');
            res.status(200).json(reports);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [POST] /
    async create(req, res) {
        const newReport = new Report(req.body);
        try {
            const savedReport = await newReport.save({});
            res.status(200).json(savedReport);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [PUT] /update/:id
    async update(req, res, next) {
        try {
            const updateReport = await Report.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            })
            res.status(200).json(updateReport);
        } catch (err) {
            res.status(500).json(err)
        }
    }

    // [DELETE] /delete/:id
    async delete(req, res, next) {
        try {
            await Report.findByIdAndDelete(req.params.id);
            res.status(200).json('Order has been delete');
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new ReportController;