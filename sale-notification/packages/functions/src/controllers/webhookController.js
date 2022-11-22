import Shopify from "shopify-api-node"
import {getNotificationItems, addNotification} from "../repositories/notificationsRepository";
import {getDocByDomain} from "../repositories/generalRepository";
import {syncOrders} from "../services/InstallationService";

export async function listenNewOrder(ctx) {
  try {
    const orderData = ctx.req.body;
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const shop = await getDocByDomain('shops', shopifyDomain);
    const shopInfo = await getDocByDomain('shopInfos', shopifyDomain);

    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken: shop.accessToken
    });

    const notifications = await getNotificationItems({shopify: shopify, orders: [orderData]});
    await addNotification({shopId: shopInfo.shopId, shopifyDomain: shopifyDomain, data: notifications[0]});

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

export async function test(ctx) {
  const shopify = new Shopify({
    shopName: 'ryan-trainning.myshopify.com',
    accessToken: 'shpua_7946ea9b03d961643d3263a219e3f4ae'
  });

  const hookList = await syncOrders({shopify: shopify, shopifyDomain: 'ryan-trainning.myshopify.com', shopId: '5kWhxa9LpCZWdhMDDsUd'});
  ctx.body = {
    message: hookList
  }
}
