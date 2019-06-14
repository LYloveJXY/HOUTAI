//引入db.js
let mongoose = require('./db.js');

let orderItemChema = mongoose.Schema({
    order_id:String,
    title:String,
    price:Number,
    num:Number,
});

 
module.exports = mongoose.model('OrderItem',orderItemChema);