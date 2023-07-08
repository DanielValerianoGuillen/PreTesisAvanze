const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:String,
    name :String,
    photos:[String],
    description:String,
    category:[String],
    extraInfo:String,
    color:String,
    brand:String,
    size:String,
    price:Number
});

 const ProductModel= mongoose.model('Product', ProductSchema);
 module.exports = ProductModel;