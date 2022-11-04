const Router = require('koa-router');
const productHandler = require('../handlers/products/productHandlers.js');
const productInputValidate = require('../middleware/productInputMiddleware.js');

const router = new Router({
    prefix: '/api'
});

router.get('/products', productHandler.getProducts);
router.get('/products/:id', productHandler.getProduct);
router.get('/faker', productHandler.fakerProducts);
router.post('/products', productInputValidate, productHandler.save);

module.exports = router;