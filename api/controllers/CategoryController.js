const Category = require('../models/Category');

class CategoryController {
    // [GET] /find/:id
    async findCategory(req, res, next) {
        try{
            const category = await Category.findById(req.params.id);
            res.status(200).json(category);
        }catch(err) {
            res.status(500).json(err);
        }
    }

     // [GET] /
     async findAllCategory(req, res, next) {
        try{
            const categories = await Category.find();
            res.status(200).json(categories);
        }catch(err) {
            res.status(500).json(err);
        }
    }

    // [POST] create/
    async create(req, res) {
        const newCategory = new Category(req.body);
        try{
            const savedCategory = await newCategory.save();
            res.status(200).json(savedCategory);
        }catch(err) {
            res.status(500).json(err);
        }
    }

    //[PUT] /update/:id
    async update(req, res, next) {
        try{
            const updateCategory =  await Category.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            })
            res.status(200).json(updateCategory);
        }catch(err) {
            res.status(500).json(err)
        }
    }

    // [DELETE] /delete/:id
    async delete(req, res, next) {
        try{
            await Category.findByIdAndDelete(req.params.id);
            res.status(200).json('Category has been delete');
        }catch(err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new CategoryController;