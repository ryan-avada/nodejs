const Router = require('koa-router');
const webhookController = require('../controllers/webhookController');

// Prefix all routes with /books
const router = new Router({
    prefix: '/webhook'
});

// Routes will go here
router.post('/order/new', webhookController.listenNewOrder);
router.get('/test', webhookController.test);

export default router;
