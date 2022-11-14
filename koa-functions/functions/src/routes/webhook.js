const Router = require('koa-router');
const webhookController = require('../handlers/controllers/webhookController');

// Prefix all routes with /books
const router = new Router({
    prefix: '/webhook'
});

// Routes will go here
router.post('/order/new', webhookController.listenNewOrder);
router.get('/listWebhooks', webhookController.getListWebhooks);

module.exports = router;