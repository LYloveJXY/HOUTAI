

let good = require('./model/goods');

/* let u = new good({
     productName:"地址",
     salePrice:1000
});
u.save(); */
/* good.findByPrice(1000,function(err,doc){
     if (err) {
          console.log(err);
          return false
     } else {
          console.log(doc);
          
     }
});
 */

good.where('salePrice').gt(400).lt(1500).exec(function(err,doc){
     if (err) {
          console.log(err);
          return false
     } else {
          console.log(doc);
     }
});

