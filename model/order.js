//引入db.js
let mongoose = require('./db.js');

let orderChema = mongoose.Schema({
    order_id:String,
    uid:Number,
    trade_no:String,
    all_price:String,
    all_num:Number,
});

 
module.exports = mongoose.model('Order',orderChema);