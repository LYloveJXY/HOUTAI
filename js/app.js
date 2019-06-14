"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerrorone = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
var cors = require('koa2-cors');
//const Controller = require('./controller');
const check = require('./check');
const jwtKoa = require('koa-jwt');
const secret = 'jwt demo';
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    if (ctx.methods == "OPTIONS") {
        ctx.body = "200";
    }
    else {
        console.log(`${ctx.method} ${ctx.url}`);
        yield next();
    }
}));
app.use(cors());
app
    .use(jwtKoa({ secret }).unless({
    path: [/^\/users\/login/, /^\/users\/register/] //数组中的路径不需要通过jwt验证
}));
/* const blogs = require('./routes/blog')
const users = require('./routes/users') */
// error handler
onerrorone(app);
// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(check());
//app.use(Controller());
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));
app.use(views(__dirname + '/views', {
    extension: 'pug'
}));
// logger
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const start = new Date();
    yield next();
    console.log(`${ctx.method} ${ctx.url}`);
}));
// routes
/* app.use(blogs.routes(), blogs.allowedMethods())
app.use(users.routes(), users.allowedMethods()) */
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});
app.listen(4002, function () {
    console.log('4002端口已开启');
});
module.exports = app;
