const Controller = require('./controller');
var checkA = require('koa');
var checkApp = new checkA();
var checkRouter = require('koa-router')();

module.exports = function () {
    checkApp.use(async (ctx: any, next: any) => {
        let result = ctx.url.split("");
        let num = 0;
        for (const key in result) {
            if (result[key] === '/') {
                num++
            }
        }
        switch (num) {
            case 1:
                console.log('你走着');
                break;
            case 2:
                checkApp.use(Controller());
                break;
            default:
                console.log(`invalid URL:`);  
                break;
        }
        console.log(`${ctx.method} ${ctx.url}`);
        await next();
    });
    return checkApp.use(Controller());
}