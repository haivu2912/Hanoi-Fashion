const Staff = require('../models/Staff');
const CryptoJS = require('crypto-js');

class StaffController {
    // [GET] /find/:id
    async findStaff(req, res, next) {
        try{
            const staff = await Staff.findById(req.params.id);
            res.status(200).json(staff);
        }catch(err) {
            res.status(500).json(err);
        }
    }

    // [GET] /find
    async findAllStaff(req, res, next) {
        try{
            const staffs = await Staff.find();
            res.status(200).json(staffs);
        }catch(err) {
            res.status(500).json(err);
        }
    }

    // [POST] create/
    async create(req, res) {
        const newStaff = new Staff(req.body);
        try{
            const savedStaff = await newStaff.save();
            res.status(200).json(savedStaff);
        }catch(err) {
            res.status(500).json(err);
        }
    }

    // [PUT] /update/:id
    async update(req, res, next) {
        try{
            const updateStaff =  await Staff.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            })
            res.status(200).json(updateStaff)
        }catch(err) {
            res.status(500).json(err)
        }
    }

    // [DELETE] /delete/:id
    async delete(req, res, next) {
        try{
            await Staff.findByIdAndDelete(req.params.id);
            res.status(200).json('Staff has been delete');
        }catch(err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new StaffController;