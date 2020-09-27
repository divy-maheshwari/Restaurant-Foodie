const express = require('express')
const router = express.Router();
const isAuth = require('../config/jwt').isAuth;
const Product = require('../models/productModel');


router.get('/',(req,res) => {
    Product.find({},(err,products) => {
        if(products) {
            res.json(products);
        }
        else {
            res.json([]);
        }
    });
});



router.get('/:id',(req,res) => {
    Product.findById({_id:req.params.id},(err,product) => {
        if(err){
            res.status(401).json({msg:'product not found'});
        }
        else {
            res.json(product);
        }
    });
});

router.post('/',isAuth,(req,res) => {
    const product = new Product({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        countInStock:req.body.countInStock,
        image:req.body.image
    });
    product.save()
                .then(productData => {
                    res.json(productData);
                });
});


router.put('/:id',isAuth,(req,res) => {
    Product.findByIdAndUpdate(req.params.id,req.body,(err,updatedProduct) => {
        if(err) {
            res.json({msg: 'failed to update the product'})
        }
        else {
            updatedProduct.save()
            .then(product => {
                res.json(product)
            })
        }
    });
});

router.delete('/:id',isAuth,(req,res) => {
    Product.findByIdAndDelete(req.params.id,req.body,(err,deletedProduct) => {
        if(deletedProduct) {
            res.json({msg: 'product deleted'});
        }
        else {
            res.json({msg: 'product failed to delete'})
        }
    })
});


router.post('/upload',(req,res) => {
    if(req.files) {
        const file = req.files.image;
        file.mv(`C:/Users/divy maheshwari/MernProjects/Restaurant/client/public/uploads/${file.name}`,err => {
            if(err) {
               return res.status(500).json(err);
            }
            res.json(file.name);
        });
    }
    else {
        return res.status(500).json({msg:'no file uploaded'});
    }
});

module.exports = router;