const Shopify = require("shopify-api-node");
const {getDocByDomain} = require("../repositories/generalRepository");
const {getNotificationItem, addNotification} = require("../repositories/notificationsRepository");

async function listenNewOrder(ctx) {
  try {
    const orderData = ctx.req.body;
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const shop = await getDocByDomain('shops', shopifyDomain);
    const shopInfo = await getDocByDomain('shopInfos', shopifyDomain);

    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken: shop.accessToken
    });

    const notiData = await getNotificationItem(shopify, orderData);
    await addNotification({shopId: shopInfo.shopId, shopifyDomain: shopifyDomain, data: notiData})

    return ctx.body = {
      success: true
    }
  } catch (e) {
    console.error(e)
    ctx.status = 404;
    return ctx.body = {
      success: false
    }
  }


}

module.exports = {
  listenNewOrder
}
