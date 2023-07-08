const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Product'},
  user: {type:mongoose.Schema.Types.ObjectId, required:true},
  checkIn: {type:Date, required:true},
  checkOut: {type:Date, required:true},
  name: {type:String, required:true},
  phone: {type:String, required:true},
  price: Number,
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;