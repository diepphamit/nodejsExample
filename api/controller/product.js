const mongoose = require('mongoose');
const Product = require('../models/product');

exports.products_get_all = (req, res, next) => {
    Product.find()
        .select('name price _id productImage')
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        })
}

exports.products_get_byId = (req, res, next) => {
    const id = req.params.productId;

    Product.findById(id)
        .select("name price _id productImage")
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: 'Can not found with id ' + id
                });
            }
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        })
}

exports.products_create_product = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price,
        productImage: "uploads\\0.0491050348753268desktop.png"
    });

    product
        .save()
        .then(result => {
            res.status(201).json({
                message: "Created successfull",
                result: result
            });
        })
        .catch(err => {
            res.status(400).json({
                rrror: err
            });
        })
}

exports.products_delete_product = (req, res, next) => {
    const id = req.params.productId;

    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                result: result
            });
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        })
}

exports.products_update_product = (req, res, next) => {
    const id = req.params.productId;
    
    Product.update({ _id: id }, { name: req.body.name, price: req.body.price, productImage: req.body.productImage})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
}