"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let blogModel = require('../schema/BlogSchema');
class Blog {
    updateBlog(author, blog_title, blog_content) {
        return new Promise((resolve, reject) => {
            blogModel.findOneAndUpdate({ author: author }, { blog_title: blog_title, blog_content: blog_content }, function (err) {
                if (err) {
                    reject(err);
                }
                resolve("success");
            });
        });
    }
    addBlog(blog_title, blog_content, author, createDate) {
        return new Promise((resolve, reject) => {
            let backData = new blogModel({
                blog_title: blog_title,
                blog_content: blog_content,
                author: author,
                createDate: createDate
            });
            backData.save(function (err) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve("success");
            });
        });
    }
    getAllBlog() {
        return new Promise((resolve, reject) => {
            blogModel.aggregate([
                {
                    $project: {
                        'blog_title': 1,
                        'blog_content': 1,
                        'author': 1,
                        'createDate': 1,
                    }
                },
            ], function (err, docs) {
                if (err) {
                    reject(err);
                }
                resolve(docs);
            });
        });
    }
    searchBlog() {
        return new Promise((resolve, reject) => {
            blogModel.aggregate([
                {
                    $project: {
                        'blog_title': 1,
                        'blog_content': 1,
                        'author': 1,
                        'createDate': 1,
                    }
                }
            ], function (err, docs) {
                if (err) {
                    reject(err);
                }
                resolve(docs);
            });
        });
    }
    getMyBlogData(author) {
        return new Promise((resolve, reject) => {
            blogModel.find({ author: author }, function (err, docs) {
                if (err) {
                    reject(err);
                }
                resolve(docs);
            });
        });
    }
    deleteBlog(delete_id) {
        return new Promise((resolve, reject) => {
            blogModel.deleteOne({ _id: delete_id }, function (err) {
                if (err) {
                    reject(err);
                }
                resolve("success");
            });
        });
    }
}
module.exports = Blog;
