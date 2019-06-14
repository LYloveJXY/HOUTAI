//引入db.js
let mongoose = require('./db.js');

let userSChema = mongoose.Schema({
    name:String,
    age:Number,
    sex:String
});

 
module.exports = mongoose.model('User',userSChema);