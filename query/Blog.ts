import { resolve } from "url";


let blogModel = require('../schema/BlogSchema');

class Blog {
    updateBlog(author: string,blog_title:string,blog_content:string){
        return new Promise((resolve,reject)=>{
            blogModel.findOneAndUpdate(
                {author:author},
                {blog_title:blog_title,blog_content:blog_content},
                function(err:any){
                    if (err) {
                        reject(err);
                    }
                    resolve("success");
                });
        });
    }

    addBlog(blog_title:string,blog_content:string,author:string,createDate:string){
        return new Promise((resolve,reject)=>{
            let backData = new blogModel({
                blog_title:blog_title,
                blog_content:blog_content,
                author:author,
                createDate:createDate
            });
            backData.save(function(err:any){
                if (err) {
                    console.log(err);
                    reject(err)
                }
                resolve("success");
            })
        });
    }

    getAllBlog(){
        return new Promise((resolve,reject)=>{
            blogModel.aggregate([
                {
                    $project:{
                        'blog_title':1,
                        'blog_content':1,
                        'author':1,
                        'createDate':1,
                    }
                },
            ],function(err:any,docs:any){
                if (err) {
                    reject(err)
                }
                resolve(docs)
            });
        });
    }

    searchBlog(){
        return new Promise((resolve,reject)=>{
            blogModel.aggregate([
                {
                    $project:{
                        'blog_title':1,
                        'blog_content':1,
                        'author':1,
                        'createDate':1,
                    }
                }
            ],function(err:any,docs:any){
                if (err) {
                    reject(err)
                }
                resolve(docs);
            });
        });
    }

    getMyBlogData(author: string){
        return new Promise((resolve,reject)=>{
            blogModel.find({author:author},function(err:any,docs:any){
                if (err) {
                    reject(err)
                }
                resolve(docs);
            });
        });
    }

    deleteBlog(delete_id:string){
        return new Promise((resolve,reject)=>{
            blogModel.deleteOne({_id:delete_id},function(err:any){
                if (err) {
                    reject(err)
                }
                resolve("success");
            });
        });
    }
}

module.exports = Blog;