const Shopify = require("shopify-api-node");

async function listenNewOrder(ctx) {
  ctx.status = 200;

  const shopify = new Shopify({
    shopName: 'ryan-trainning.myshopify.com',
    accessToken: 'shpua_d2ecd95e444d06476ac62bb6bcf476e0'
  })

  const webhooks = await shopify.webhook.list().then((webhook) => console.log(webhook));

  ctx.body = {
    message: webhooks
  }
}

async function getListWebhooks(ctx) {
  const shopify = new Shopify({
    shopName: "ryan-trainning.myshopify.com",
    accessToken: "shpua_d2ecd95e444d06476ac62bb6bcf476e0"
  })
  await shopify.webhook.create({
    address: "https://localhost:3000/webhook/order/new",
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
}
