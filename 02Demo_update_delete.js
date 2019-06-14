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

//更新数据
/*User.updateOne({name:"吴灿"},{name:"吴灿是sb"},function (err,doc) {
     if ( err ){
          console.log(err);
          return false
     }
     User.find({},function (error,totle) {
          if ( error ){
               console.log(error);
               return false
          }
          console.log(totle);
     })
});*/


//删除数据
let u = new User({
     name:"小飞",
     age:20
});
u.save();

User.deleteOne({age:38},function (err){
     if ( err ){
          console.log(err);
          return false
     }
     console.log("成功");
});

