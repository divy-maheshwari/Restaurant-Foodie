const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    countInStock:{
        type:Number
    }
})

module.exports = mongoose.model('ProductDetails',ProductSchema);