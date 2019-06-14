"use strict";
// 引入 userSchema
let userModel = require('../schema/UserSchema');
class User {
    //检查是否有当前用户
    checkUser(user_name) {
        return new Promise((resolve, resject) => {
            userModel.find({ user_name: user_name }, function (err, docs) {
                if (err) {
                    resject(err);
                }
                resolve(docs);
            });
        });
    }
    // 添加新用户
    addUser(user_name, user_pwd) {
        return new Promise((resolve, reject) => {
            let u = new userModel({
                user_name: user_name,
                user_pwd: user_pwd,
            });
            u.save(function (err) {
                if (err) {
                    reject(err);
                }
                resolve('success');
            });
        });
    }
    //检查原密码是否正确
    checkOldPwd(user_name, old_pwd) {
        return new Promise((resolve, reject) => {
            userModel.find({ user_name: user_name, user_pwd: old_pwd }, function (err, docs) {
                if (err) {
                    reject(err);
                }
                resolve(docs);
            });
        });
    }
    // 改密码
    updatePwd(user_name, old_pwd, new_pwd) {
        return new Promise((resolve, reject) => {
            userModel.updateOne({ user_name: user_name, user_pwd: old_pwd }, { user_name: user_name, user_pwd: new_pwd }, function (err) {
                if (err) {
                    reject(err);
                }
                resolve("success");
            });
        });
    }
}
module.exports = User;
