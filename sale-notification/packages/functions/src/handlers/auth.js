import App from 'koa';
import 'isomorphic-fetch';
import {shopifyAuth} from '@avada/shopify-auth';
import shopifyConfig from '../config/shopify';
import render from 'koa-ejs';
import path from 'path';
import createErrorHandler from '../middleware/errorHandler';
import firebase from 'firebase-admin';
import * as errorService from '../services/errorService';
import api from "./api";

const Shopify = require('shopify-api-node');
import {Firestore, Timestamp} from '@google-cloud/firestore';
import defaultSettings from "../../../functions/src/default/defaultSettings";

if (firebase.apps.length === 0) {
  firebase.initializeApp();
}

const firestore = new Firestore();

// Initialize all demand configuration for an application
const app = new App();
app.proxy = true;

render(app, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
app.use(createErrorHandler());

// Register all routes for the application
app.use(
  shopifyAuth({
    apiKey: shopifyConfig.apiKey,
    firebaseApiKey: shopifyConfig.firebaseApiKey,
    initialPlan: {
      features: {},
      id: 'free',
      name: 'Free plan',
      periodDays: 3650,
      price: 0,
      trialDays: 0
    },
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    successRedirect: '/',
    afterInstall: async ctx => {
      try {
        const shopDomain = ctx.state.shopify.shop;
        const shopInfo = await getCollectionData('shopInfos', shopDomain);
        const shopID = shopInfo.shopId;

        // set default settings
        firestore.collection('settings')
          .add({shopId: shopID, ...defaultSettings});

        const shopData = await getCollectionData('shops', shopDomain);
        const shopify = new Shopify({
          shopName: shopDomain,
          accessToken: shopData.accessToken
        })

        // sync 30 order
        shopify.order
          .list({limit: 30})
          .then((order) => {
            order.map(async (ord) => {
              const productData = await getProductData(shopify, ord.line_items[0].product_id)
              firestore.collection('notifications')
                .add({
                  shopId: shopID,
                  firstName: ord.customer.first_name,
                  city: ord.customer.default_address.city,
                  country: ord.customer.default_address.country,
                  productName: ord.line_items[0].name,
                  productId: ord.line_items[0].product_id,
                  productImage: productData.image.src,
                  shopDomain: shopDomain,
                  timestamp: Timestamp.now()
                });
            })
          })
          .catch((err) => console.log(err))

        // create webhook
        await shopify.webhook.create({
          address: "https://localhost:3000/webhook/order/new",
          format: 'json',
          topic: "orders/create"
        })

      } catch (e) {
        console.error(e)
      }
    }
  }).routes()
);

async function getCollectionData(collectionName, domain) {
  const dataRef = firestore.collection(collectionName);
  const dataFilter = await dataRef
    .where('domain', '==', domain)
    .limit(1)
    .get();

  if (dataFilter.empty) {
    return null;
  }
  const dataDoc = dataFilter.docs[0];

  return {...dataDoc.data()};
}

async function getProductData(shopifyConfig, productId) {
  let resp = [];
  await shopifyConfig.product
    .get(productId)
    .then((productData) => {
      resp.push(productData);
    })
    .catch((err) => console.log(err))

  return resp[0];
}

// Handling all errors
api.on('error', errorService.handleError);

export default app;
