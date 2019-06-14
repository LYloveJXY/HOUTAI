"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const router = require('koa-router')();
router.prefix('/blog');
const blog_jwt = require('jsonwebtoken');
const blog_jwtKoa = require('koa-jwt');
const blog_util = require('util');
const blog_verify = blog_util.promisify(blog_jwt.verify); //解密
const blog_secret = 'jwt demo';
let bloglist = require('../query/Blog');
let blog = new bloglist();
//引入 状态码
let BlogCode = require('../Code/Status');
//添加博客
/* router.post('/add_blog', async (ctx: any, next: any) => {
  //博客标题
  let blog_title: string = ctx.request.body.blogTitle;
  //博客内容
  let blog_content: string = ctx.request.body.blogContent;
  let token: any = ctx.header.authorization;
  let payload: any = await blog_verify(token.split(' ')[1], blog_secret);
  //博客作者
  let author: string = payload.name;

  //创建日期
  let y: Number = new Date().getFullYear();
  let m: Number = (new Date().getMonth() + 1);
  let d: Number = new Date().getDate();
  let createDate: String = `${y}-${m}-${d}`;


  try {
    let result = await blog.addBlog(blog_title, blog_content, author, createDate);
    if (result) {
      ctx.body = new BlogCode("0", "", "添加成功")
    } else {
      ctx.body = new BlogCode("1", "", "失败")
    }
  } catch (error) {
    console.log(error);
    return false
  }
}); */
let add_blog = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    //博客标题
    let blog_title = ctx.request.body.blogTitle;
    //博客内容
    let blog_content = ctx.request.body.blogContent;
    let token = ctx.header.authorization;
    let payload = yield blog_verify(token.split(' ')[1], blog_secret);
    //博客作者
    let author = payload.name;
    //创建日期
    let y = new Date().getFullYear();
    let m = (new Date().getMonth() + 1);
    let d = new Date().getDate();
    let createDate = `${y}-${m}-${d}`;
    try {
        let result = yield blog.addBlog(blog_title, blog_content, author, createDate);
        if (result) {
            ctx.body = new BlogCode("0", "", "添加成功");
        }
        else {
            ctx.body = new BlogCode("1", "", "失败");
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
//初始化拿到博客列表
/* router.get('/init', async (ctx: any, next: any) => {
  try {
    let result = await blog.getAllBlog();
    ctx.body = new BlogCode("0", "", result);
  } catch (error) {
    console.log(error);
    return false
  }

}); */
let init = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let result = yield blog.getAllBlog();
        ctx.body = new BlogCode("0", "", result);
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
//条件查询
/* router.post('/search', async (ctx: any, next: any) => {
  let keywords: string = ctx.request.body.keywords;
  try {
    let result: any = await blog.searchBlog();
    let arr: Array<any> = [];
    result.forEach((item: any) => {
      if (item.blog_title.includes(keywords) || item.author.includes(keywords)) {
        arr.push(item)
      }
    });
    ctx.body = new BlogCode("0", "", arr);
  } catch (error) {
    console.log(error);
    return false
  }

}); */
let search = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let keywords = ctx.request.body.keywords;
    try {
        let result = yield blog.searchBlog();
        let arr = [];
        result.forEach((item) => {
            if (item.blog_title.includes(keywords) || item.author.includes(keywords)) {
                arr.push(item);
            }
        });
        ctx.body = new BlogCode("0", "", arr);
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
//我的博客初始化
/* router.get('/my_blog', async (ctx: any, next: any) => {
  let token: any = ctx.header.authorization;
  let payload: any = await blog_verify(token.split(' ')[1], blog_secret);
  //博客作者
  let author: string = payload.name;

  let result: Array<any> = await blog.getMyBlogData(author);
  if (result.length > 0) {
    ctx.body = new BlogCode("0", "", result);
  }
}); */
let my_blog = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let token = ctx.header.authorization;
    let payload = yield blog_verify(token.split(' ')[1], blog_secret);
    //博客作者
    let author = payload.name;
    let result = yield blog.getMyBlogData(author);
    if (result.length > 0) {
        ctx.body = new BlogCode("0", "", result);
    }
});
//删除博客
/* router.post('/delete_blog', async (ctx: any, next: any) => {
  let delete_id = ctx.request.body.deleteId;
  try {
    let result:string = await blog.deleteBlog(delete_id);
    if (result) {
      ctx.body = new BlogCode("0", "", "删除成功");
    }
  } catch (error) {
    console.log(error);
    return false
  }
}); */
let delete_blog = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let delete_id = ctx.request.body.deleteId;
    try {
        let result = yield blog.deleteBlog(delete_id);
        if (result) {
            ctx.body = new BlogCode("0", "", "删除成功");
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
//更新博客
/* router.post('/change_myblog', async (ctx: any, next: any) => {
  let blog_title:string = ctx.request.body.blog_title;
  let blog_content:string = ctx.request.body.blog_content;

  let token: any = ctx.header.authorization;
  let payload: any = await blog_verify(token.split(' ')[1], blog_secret);
  //博客作者
  let author: string = payload.name;

  try {
    let result:string = await blog.updateBlog(author,blog_title,blog_content);
    if (result) {
      ctx.body = new BlogCode("0","","修改成功!");
    }
  } catch (error) {
    console.log(error);
    return false
  }
}); */
let change_myblog = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let blog_title = ctx.request.body.blog_title;
    let blog_content = ctx.request.body.blog_content;
    let token = ctx.header.authorization;
    let payload = yield blog_verify(token.split(' ')[1], blog_secret);
    //博客作者
    let author = payload.name;
    try {
        let result = yield blog.updateBlog(author, blog_title, blog_content);
        if (result) {
            ctx.body = new BlogCode("0", "", "修改成功!");
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
module.exports = {
    'GET /blog/my_blog': my_blog,
    'GET /blog/init': init,
    'POST /blog/change_myblog': change_myblog,
    'POST /blog/delete_blog': delete_blog,
    'POST /blog/search': search,
    'POST /blog/add_blog': add_blog,
};
