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

app.use(async (ctx: any, next: any) => {
  if (ctx.methods == "OPTIONS") {
    ctx.body = "200";
  } else {
    console.log(`${ctx.method} ${ctx.url}`);
    await next();
  }
});

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
app.use(async (ctx: any, next: any) => {
  const start = new Date();
  await next();
  console.log(`${ctx.method} ${ctx.url}`);
});

// routes
/* app.use(blogs.routes(), blogs.allowedMethods())
app.use(users.routes(), users.allowedMethods()) */

// error-handling
app.on('error', (err: any, ctx: any) => {
  console.error('server error', err, ctx)
});


app.listen(4002, function () {
  console.log('4002端口已开启');

});
module.exports = app;
