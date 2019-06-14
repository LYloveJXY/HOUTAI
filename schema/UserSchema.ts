

const userMongoose = require('../model/db');

//定义 users schema

var UserSchema=userMongoose.Schema({
    user_name:{
        type:String,
        require:true,
        unique: true
    },
    user_pwd:{
        type:String,
        require:true
    },
});

module.exports = userMongoose.model('User',UserSchema);