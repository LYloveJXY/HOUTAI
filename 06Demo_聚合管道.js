let Order = require('./model/order.js');
let OrderItem = require('./model/order_item.js');
const mongoose = require('mongoose');
/* 
Order.aggregate([
     {
          $lookup:{
               from:"orderitems",
               localField: "order_id", 
               foreignField: "order_id", 
               as: "items"
          }
     },
     {
          $match:{all_price:{$gte:"90"}}
     }
],function(err,result){
     if (err) {
          console.log(err);
          return false
     }
     console.log(JSON.stringify(result));
}); */

/*
查询order_item,找出商品名称为牛奶的订单号和订单总价格 
 */
//获取objectId  通过mongoose.Types.ObjectId来获取

 OrderItem.aggregate([
      {
           $lookup:{
               from:"orders",
               localField: "order_id", 
               foreignField: "order_id", 
               as: "list"
           }
      },
      {
           $match:{_id:mongoose.Types.ObjectId('5ce7968941bf626ac855142a')}
      }   
 ],function(err,doc){
      if (err) {
           console.log(err);
           return false
      }
      console.log(JSON.stringify(doc));
      
 })


