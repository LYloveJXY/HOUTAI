"use strict";
var fs = require('fs');
/* function showRoute(){
    fs.readdir('./js/routes',function(err:any,docs:any){
        if (err) {
            console.log(err);
            return false
        }
        (function getData(i){
            if (i === docs.length) {
                console.log('成功');
            }
            app1.use(require('./routes/'+docs[i]).routes(),require('./routes/'+docs[i]).allowedMethods())
        })(0)
        
    });
} */
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        }
        else if (url.startsWith('POST')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        }
        else {
            console.log(`invalid URL: ${url}`);
        }
    }
}
function addControllers(router, dir) {
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/' + dir + '/' + f);
        console.log(mapping);
        addMapping(router, mapping);
    });
}
module.exports = function (dir) {
    let route_dir = dir || 'routes', router = require('koa-router')();
    addControllers(router, route_dir);
    return router.routes();
};
