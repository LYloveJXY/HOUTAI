
const blogMongoose = require('../model/db');


//定义 users schema

var BlogSchema=blogMongoose.Schema({
    blog_title:{
        type:String,
        require:true
    },
    blog_content:{
        type:String,
        require:true,
        maxlength:500,
        minlength:1,
    },
    author:{
        type:String,
        require:true
    },
    createDate:{
        type:String,
        require:true
    },
});

module.exports = blogMongoose.model('Blog_List',BlogSchema);