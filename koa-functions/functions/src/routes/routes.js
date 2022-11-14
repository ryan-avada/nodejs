const Router = require('koa-router');
const helloWorldController = require('../handlers/controllers/helloWorld');

// Prefix all routes with /books
const router = new Router({
    prefix: '/api'
});

// Routes will go here
router.get('/helloworld', helloWorldController.hello);

module.exports = router;