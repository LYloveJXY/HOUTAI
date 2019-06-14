//引入 fs模块
const cfs = require('fs');

//判断是get还是post请求  分别做处理
function Mapping(router:any,mapping:any){
    //for in 循环 mapping对象  k为key值  mapping[k]是value值
    for (var k in mapping) {
        if (k.startsWith("GET")) {
            // 获取接口地址
            let path = k.substring(4);   
            router.get(path,mapping[k]);
            console.log(`register URL mapping: GET ${path}`);
        }else if(k.startsWith("POST")){
            // 获取Post请求地址
            let path = k.substring(5);
            router.post(path,mapping[k]);
            console.log(`register URL mapping: POST ${path}`);
        }else{
            console.log(`invalid URL: ${k}`);  
        }
    }
}

//得到文件夹下面的所有文件
function getDir_file(router:any,dir:any){
    cfs.readdirSync(__dirname + '/' + dir).filter((item:any)=>{
        return item.endsWith('.js')
    }).forEach((val:any)=>{
        console.log(`process controller: ${val}...`);
        let mapping:any = require(__dirname+'/'+dir+'/'+val);
        Mapping(router,mapping)
    });
}

module.exports = function(dir:any){
    //获取文件夹
    let get_dir:any = dir || "routes";
    //得到router
    const router = require('koa-router')();
    getDir_file(router,get_dir);
    //启动路由
    return router.routes();
}