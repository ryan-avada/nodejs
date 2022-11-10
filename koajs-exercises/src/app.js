const Koa = require('koa');
const koaBody = require('koa-body');
const routers = require('./routers/routers');
const cors = require('@koa/cors');

const app = new Koa();

app.use(cors());
app.use(koaBody());
app.use(routers.routes());
app.use(routers.allowedMethods());

app.listen(5000);