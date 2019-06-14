//引入 mongoose

const mongoose = require('mongoose');

//链接数据库
mongoose.connect('mongodb://localhost/admin');

//定义 Schema
let UserSchema = mongoose.Schema({
    name:String,
    age:Number
});

//创建model 操作数据库
let User = mongoose.model('User',UserSchema);

//增加数据
let result = new User({
    name:"吴灿",
    age:38
});
//保存进入数据库
result.save(function(err,docs){
    if (err) {
        console.log(err);
        return false
    }
    console.log(docs);
    
});
//查找数据
User.find({},function (err,docs) {
     if ( err ){
          console.log(err);
          return false
     }
     console.log(docs);
});