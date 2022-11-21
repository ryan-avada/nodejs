const Router = require('koa-router');
const clientApiController = require('../controllers/clientApiController');

// Prefix all routes with /books
const router = new Router({
  prefix: '/client'
});

// Routes will go here
router.get('/notifications', clientApiController.get);

export default router;
