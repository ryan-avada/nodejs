const Koa = require('koa');
const routes = require('../routes/webhook');
const cors = require('@koa/cors');

const webhook = new Koa();

webhook.use(cors());
webhook.use(routes.routes());
webhook.use(routes.allowedMethods());

module.exports = webhook;