let User = require('./model/user.js');

let OrderItem = require('./model/order_item.js');

//const mongoose = require('mongoose');

/* User.aggregate([
     {
          
     }
],function(err,docs){
     if (err) {
          console.log(err);
          return false
     }
     console.log(docs);
     
}); */

/* User.updateOne({name:"小飞",age:20},{name:"小飞",age:15},function(err){
     if (err) {
          console.log(err);
          return false
     }
     console.log("成功");
     
}); */

User.findOneAndUpdate({name:"小飞"},{age:18},function(err){
     if (err) {
          console.log(err);
          return false
     }
     console.log("success");
     
})



