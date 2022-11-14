const Shopify = require('shopify-api-node')

async function listenNewOrder(ctx) {
    ctx.status = 200;
    console.log(ctx.req.body)
}

async function getListWebhooks(ctx) {
    const shopify = new Shopify({
        shopName: "ryan-trainning.myshopify.com",
        accessToken: "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"
    })
    await shopify.webhook.create({
        address: "https://ryan-nguyen-api.free.beeceptor.com/order/create",
        format: 'json',
        topic: "orders/create"
    })
    const webhooks = await shopify.webhook.list();
    ctx.body = {
        webhooks
    }
}

module.exports = {
    listenNewOrder,
    getListWebhooks
};