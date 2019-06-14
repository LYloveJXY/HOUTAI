

// 引入 userSchema
let userModel = require('../schema/UserSchema');

 class User {
     //检查是否有当前用户
    checkUser(user_name:string){
        return new Promise((resolve,resject)=>{
            userModel.find({user_name:user_name},function(err:any,docs:any){
                if (err) {
                    resject(err)
                }
                resolve(docs);
            });
        });
    }

    // 添加新用户
    addUser(user_name:string,user_pwd:string){
        return new Promise((resolve,reject)=>{
            let u = new userModel({
                user_name:user_name,
                user_pwd:user_pwd,
            });
            u.save(function(err:any){
                if (err) {
                    reject(err)
                }
                resolve('success');
            });
        });
    }

    //检查原密码是否正确
    checkOldPwd(user_name:string,old_pwd:string){
        return new Promise((resolve,reject)=>{
            userModel.find({user_name:user_name,user_pwd:old_pwd},function(err:any,docs:any){
                if (err) {
                    reject(err)
                }
                resolve(docs);
            });
        });
    }

    // 改密码
    updatePwd(user_name:string,old_pwd:string,new_pwd:string){
        return new Promise((resolve,reject)=>{
            userModel.updateOne(
                {user_name:user_name,user_pwd:old_pwd},
                {user_name:user_name,user_pwd:new_pwd},
                function(err:any){
                    if (err) {
                        reject(err)
                    }
                    resolve("success");
                });
        });
    }

 }

 module.exports = User;