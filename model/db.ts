
//引入 mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog_work',{ useNewUrlParser: true },function(err:any){
    if (err) {
        console.log('数据库连接失败'+err);
        return false
    }
    console.log('success');
});

module.exports = mongoose;

