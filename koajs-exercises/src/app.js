const Koa = require('koa');
const koaBody = require('koa-body');
const routers = require('./routers/routers');
const cors = require('@koa/cors');
const render = require('koa-ejs');
const path = require('path');

const app = new Koa();

render(app, {
    root: path.join(__dirname, 'view'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true
});

app.use(async function (ctx) {
    await ctx.render('template');
});

app.use(cors());
app.use(koaBody());
app.use(routers.routes());
app.use(routers.allowedMethods());

app.listen(5000);