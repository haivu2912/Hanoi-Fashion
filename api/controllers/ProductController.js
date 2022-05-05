const Product = require('../models/Product');

class ProductController {
    async findProductByName(req, res, next) {
        const queryName = req.query.name;
        try {
            const product = await Product.find({
                title: new RegExp(queryName, 'i')
            })
            // const product = await Product.find({
            //     title: {
            //         $in: [queryName]
            //     }
            // })
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [GET] /find/:id
    async findProduct(req, res, next) {
        try {
            const product = await Product.findById(req.params.id).populate({
                path: 'reviews',
                populate: {
                    path: 'userId'
                }
            });
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [GET] /find
    async findAllProduct(req, res, next) {
        const queryNew = req.query.new;
        const queryCategory = req.query.category;
        try {
            let products;
            if (queryNew) {
                products = await Product.find().sort({ createdAt: -1 }).limit(5);
            } else if (queryCategory) {
                products = await Product.find({
                    categories: {
                        $in: [queryCategory]
                    }
                })
            } else {
                products = await Product.find();
            }
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [POST] /
    async create(req, res) {
        const newProduct = new Product(req.body);
        try {
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [PUT] /update/:id
    async update(req, res, next) {
        try {
            const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            })
            res.status(200).json(updateProduct)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    // [DELETE] /delete/:id
    async delete(req, res, next) {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json('Product has been delete');
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async updateProduct(req, res, next) {
        const orderItems = req.body;
        try {
            orderItems.forEach(async (item, i) => {
                const product = await Product.findOne({ _id: item.productId._id },
                    function (err, obj) { }
                ).clone();
                await Product.updateOne({ _id: item.productId._id },
                    {
                        $set: {
                            "quantity": product.quantity - item.quantity,
                            "sold": product.sold + item.quantity
                        }
                    });

            })

        } catch {

        }
    }
}

module.exports = new ProductController;