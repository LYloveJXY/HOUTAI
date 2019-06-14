let User = require('./model/user.js');

let OrderItem = require('./model/order_item.js');

//const mongoose = require('mongoose');


/* OrderItem.aggregate([
     {
          $project:{
               price:1,
               title:1
          }
     },
     {
          $sort:{price:-1}
     },
     {
          $skip:3
     },
     {
          $limit:5
     }
],function(err,docs){
     if (err) {
          console.log(err);
          return false
     }
     console.log(JSON.stringify(docs));
     
});
 */

 // 加入多个数据
/* let data = [
     {
          name:"温铖",
          age:21,
          sex:"男"
     },
     {
         name:"刘安",
         age:22,
         sex:"男"
     }
]
 User.insertMany(data,function(err,doc){
      if (err) {
           console.log(err);
           return false
      }
      console.log('加入成功');
      
 }); */



 User.aggregate([
      {
           $group:{
                _id:"$sex",
                avgAge:{$avg:'$age'},
                sum:{$sum:"$age"},
                count:{$sum:1}
           }
      }
 ],function(err,result){
      if (err) {
           console.log(err);
           return false
      }
      console.log(result);
      
 });




