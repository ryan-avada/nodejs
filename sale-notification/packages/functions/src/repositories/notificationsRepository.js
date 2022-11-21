import {Firestore, Timestamp} from '@google-cloud/firestore';

const firestore = new Firestore();

/**
 * @documentation
 *
 * Only use one repository to connect to one collection, do not
 * try to connect more than one collection from one repository
 */
const collection = firestore.collection('notifications');

/**
 *
 * @returns {Promise<*[]>}
 */
export async function getNotifications() {
  const querySnapshot = await collection.get();

  return querySnapshot.docs.map(doc => ({
    id: doc.id, ...doc.data()
  }))
}

/**
 *
 * @param shopId
 * @param shopifyDomain
 * @param data
 * @returns {Promise<boolean>}
 */
export async function addNotification({shopId, shopifyDomain, data}) {
  await collection.add({
    shopId: shopId,
    shopDomain: shopifyDomain,
    timestamp: new Date(),
    ...data
  })
}

export async function getNotificationsByDomain(shopDomain) {
  const querySnapshot = await collection.where('shopDomain', '==', shopDomain)
    .get();

  return querySnapshot.docs.map(doc => ({
    id: doc.id, ...doc.data()
  }))
}

/**
 *
 * @param shopify
 * @param orders
 * @returns {Promise<*>}
 */
export async function getNotificationItems({shopify, orders}) {
  const productIds = orders
    .map(order => order.line_items[0].product_id)
    .filter((value, index, array) => array.indexOf(value) === index)

  const productList = await shopify.product.list({ids: productIds.toString()})

  const ordersWithProduct = orders.map(order => (
    {
      ...order,
      product: productList.filter(product => product.id == order.line_items[0].product_id)[0]
    }))

  return await getNotificationParams(ordersWithProduct)
}

/**
 *
 * @param orders
 * @returns {Promise<*>}
 */
export async function getNotificationParams(orders) {
  return orders.map(order => ({
    firstName: order.customer.first_name,
    city: order.customer.default_address.city,
    country: order.customer.default_address.country,
    productName: order.product.title,
    productId: order.product.id,
    productImage: order.product.image.src,
  }));
}
