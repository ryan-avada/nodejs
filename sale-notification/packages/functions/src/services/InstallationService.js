import defaultSettings from "../default/defaultSettings";
import {saveSettings} from "../repositories/settingsRepository";
import {addNotification, getNotificationItems} from "../repositories/notificationsRepository";

/**
 *
 * @param shopify
 * @returns {Promise<void>}
 */
export async function createWebhook(shopify) {
  await shopify.webhook.create({
    address: "https://c56e-117-6-131-199.ap.ngrok.io/webhook/order/new",
    format: 'json',
    topic: "orders/create"
  })
}

/**
 *
 * @param shopify
 * @param shopId
 * @param shopifyDomain
 * @returns {Promise<void>}
 */
export async function syncOrders({shopify, shopId, shopifyDomain}) {
  const orders = await shopify.order.list({limit: 1});
  const notifications = await getNotificationItems({shopify: shopify, orders: orders});

  notifications.map(data => {
    addNotification({shopId: shopId, shopifyDomain: shopifyDomain, data: data});
  })
}

export async function registerSciptTag() {

}

/**
 *
 * @param shopId
 * @returns {Promise<void>}
 */
export async function createDefaultSetting(shopId) {
  await saveSettings({data: defaultSettings, shopID: shopId});
}
