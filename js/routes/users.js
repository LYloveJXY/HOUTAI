"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Router = require('koa-router')();
// Router.prefix('/users')
let Users = require('../query/User');
let user = new Users();
const jwt = require('jsonwebtoken');
const jwtoneKoa = require('koa-jwt');
const util = require('util');
const verify = util.promisify(jwt.verify); //解密
const user_secret = 'jwt demo';
//引入 状态码
let Code = require('../Code/Status');
// 注册
/* Router.post('/register', async (ctx: any, next: any) => {
  let user_name: string = ctx.request.body.userName;
  let user_pwd: string = ctx.request.body.userPwd;
  try {
    let result: any = await user.checkUser(user_name);
    if (result.length > 0) {
      ctx.body = new Code("1", "", "用户已存在");
    } else {
      let data: any = await user.addUser(user_name, user_pwd);
      if (data) {
        ctx.body = new Code("0", "", "注册成功");
      }
    }
  } catch (error) {
    console.log(error);
    return false
  }
}); */
let register = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let user_name = ctx.request.body.userName;
    let user_pwd = ctx.request.body.userPwd;
    try {
        let result = yield user.checkUser(user_name);
        if (result.length > 0) {
            ctx.body = new Code("1", "", "用户已存在");
        }
        else {
            let data = yield user.addUser(user_name, user_pwd);
            if (data) {
                ctx.body = new Code("0", "", "注册成功");
            }
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
//登录
/* Router.post('/login', async (ctx: any, next: any) => {
  let user_name: string = ctx.request.body.userName;
  let user_pwd: string = ctx.request.body.userPwd;
  try {
    let result = await user.checkUser(user_name);
    if (result.length > 0 && result[0].user_pwd === user_pwd) {
      let userToken = {
        name: result[0].user_name
    }
      const token = jwt.sign(userToken,user_secret,{expiresIn: '13h'});
      ctx.body = new Code("0", token, user_name);
    } else {
      ctx.body = new Code("1", "", "");
    }
  } catch (error) {
    console.log(error);
    return false
  }
}); */
let login = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let user_name = ctx.request.body.userName;
    let user_pwd = ctx.request.body.userPwd;
    try {
        let result = yield user.checkUser(user_name);
        if (result.length > 0 && result[0].user_pwd === user_pwd) {
            let userToken = {
                name: result[0].user_name
            };
            const token = jwt.sign(userToken, user_secret, { expiresIn: '13h' });
            ctx.body = new Code("0", token, user_name);
        }
        else {
            ctx.body = new Code("1", "", "用户名或密码错误");
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
//检查登录
/* Router.post('/check_login', async (ctx: any, next: any) => {
  let token:any = ctx.header.authorization;
  if (token) {
    let payload:any = await verify(token.split(' ')[1], user_secret);
    ctx.body = new Code("0", "", payload);
  }else{
    ctx.body = new Code("1", "", "未登录");
  }
}); */
let check_login = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let token = ctx.header.authorization;
    if (token) {
        let payload = yield verify(token.split(' ')[1], user_secret);
        ctx.body = new Code("0", "", payload);
    }
    else {
        ctx.body = new Code("1", "", "未登录");
    }
});
//修改密码
/* Router.post('/update_pwd', async (ctx: any, next: any) => {
  let old_pwd:string = ctx.request.body.oldPwd;
  let new_pwd:string = ctx.request.body.newPwd;

  let token:any = ctx.header.authorization;
  let payload:any = await verify(token.split(' ')[1], user_secret);
  let user_name:string = payload.name;

  try {
    let result = await user.checkOldPwd(user_name,old_pwd);
    if (result.length > 0) {
      let backData = await user.updatePwd(user_name,old_pwd,new_pwd);
      if (backData) {
        ctx.body = new Code("0","","修改成功!");
      }
    }else{
      ctx.body = new Code("1","","原密码错误!");
    }
  } catch (error) {
    console.log(error);
    return false
  }
}); */
let update_pwd = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let old_pwd = ctx.request.body.oldPwd;
    let new_pwd = ctx.request.body.newPwd;
    let token = ctx.header.authorization;
    let payload = yield verify(token.split(' ')[1], user_secret);
    let user_name = payload.name;
    try {
        let result = yield user.checkOldPwd(user_name, old_pwd);
        if (result.length > 0) {
            let backData = yield user.updatePwd(user_name, old_pwd, new_pwd);
            if (backData) {
                ctx.body = new Code("0", "", "修改成功!");
            }
        }
        else {
            ctx.body = new Code("1", "", "原密码错误!");
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
module.exports = {
    'POST /users/login': login,
    'POST /users/register': register,
    'POST /users/check_login': check_login,
    'POST /users/update_pwd': update_pwd,
};
