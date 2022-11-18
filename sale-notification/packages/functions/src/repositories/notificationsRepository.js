import {Firestore, Timestamp} from '@google-cloud/firestore';

const firestore = new Firestore();

/**
 * @documentation
 *
 * Only use one repository to connect to one collection, do not
 * try to connect more than one collection from one repository
 */
const notificationsRef = firestore.collection('notifications');

async function getNotifications() {
  let resp = [];
  await notificationsRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      resp.push({id: doc.id, ...doc.data(), timestamp: doc.data().timestamp.toDate()});
    });
  });

  return resp;
}

async function addNotification({shopId, shopifyDomain, data}) {
  try {
    firestore.collection('notifications')
      .add({
        shopId: shopId,
        shopDomain: shopifyDomain,
        timestamp: Timestamp.now(),
        ...data
      });
    return true;
  } catch (e) {
    return false
  }
}

async function getNotificationItem(shopify, orderData) {
  const productData = await getProductData(shopify, orderData.line_items[0].product_id);

  return {
    firstName: orderData.customer.first_name,
    city: orderData.customer.default_address.city,
    country: orderData.customer.default_address.country,
    productName: orderData.line_items[0].name,
    productId: orderData.line_items[0].product_id,
    productImage: productData.image.src,
  }
}

async function getProductData(shopify, productId) {
  let resp = [];
  await shopify.product
    .get(productId)
    .then((productData) => {
      resp.push(productData);
    })
    .catch((err) => console.log(err))

  return resp[0];
}


module.exports = {
  getNotifications,
  addNotification,
  getNotificationItem
}
