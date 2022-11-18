const Router = require('koa-router');
const webhookController = require('../controllers/webhookController');
const {verifyRequest} = require("@avada/shopify-auth");

// Prefix all routes with /books
const router = new Router({
    prefix: '/webhook'
});

// router.use(verifyRequest());
// Routes will go here
router.get('/order/new', webhookController.listenNewOrder);
router.get('/listWebhooks', webhookController.getListWebhooks);

export default router;
