

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/admin',{ useNewUrlParser: true },function (err) {
     if ( err ){
          console.log("数据库连接失败!")
     }
     console.log("连接成功");
});

//定义schema

let GoodSchema = mongoose.Schema({
          productId:{
               type:String,
               default:1000
          },
          productName:String,
          salePrice:Number
});

let Good = mongoose.model('Good',GoodSchema);
//添加商品
let u = new Good({
   productName: "商品",
   salePrice: 1000
});
u.save();
