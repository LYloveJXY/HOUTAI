
let Goods = require('./model/goods');
Goods.find({},function (err,doc) {
     if ( err ){
          console.log(err);
          return false
     }
     console.log(doc);
});