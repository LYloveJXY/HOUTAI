//引入db.js
let mongoose = require('./db.js');

let goodSchema = mongoose.Schema({
   productName:String,
   salePrice:Number
});
//静态方法
goodSchema.statics.findByPrice = function(sn,callback){
     this.find({salePrice:sn},function(err,doc){
      callback(err,doc);
     });
};

//实例方法 用的少
goodSchema.methods.print = function(){

}


module.exports = mongoose.model('Good',goodSchema);