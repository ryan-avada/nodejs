const Router = require('koa-router');
const productHandler = require('../handlers/todos/todoHandlers.js');

const router = new Router({
    prefix: '/api'
});

router.get('/todos', productHandler.getTodos);
router.get('/todo/:id', productHandler.getTodo);
router.post('/todo', productHandler.save);
router.put('/todo/:id', productHandler.update);
router.delete('/todo/:id', productHandler.remove);

module.exports = router;