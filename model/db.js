const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/admin',{ useNewUrlParser: true },function (err) {
     if ( err ){
          console.log("数据库连接失败!")
     }
     console.log("连接成功");
});

module.exports = mongoose;