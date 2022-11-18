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
import {addNotification, getNotificationItem} from "../repositories/notificationsRepository";
import {getDocByDomain} from "../repositories/generalRepository";

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
        const shopInfo = await getDocByDomain('shopInfos', shopDomain);
        const shopID = shopInfo.shopId;

        // set default settings
        firestore.collection('settings')
          .add({shopId: shopID, ...defaultSettings});

        const shopData = await getDocByDomain('shops', shopDomain);
        const shopify = new Shopify({
          shopName: shopDomain,
          accessToken: shopData.accessToken
        })

        // sync 30 order
        shopify.order
          .list({limit: 30})
          .then((order) => {
            order.map(async (ord) => {
              const data = await getNotificationItem(shopify, ord);
              await addNotification({shopId: shopID, shopifyDomain: shopDomain, data: data})
            })
          })
          .catch((err) => console.log(err))

        // create webhook
        await shopify.webhook.create({
          address: "https://03a3-117-6-131-199.ap.ngrok.io/webhook/order/new",
          format: 'json',
          topic: "orders/create"
        })

      } catch (e) {
        console.error(e)
      }
    }
  }).routes()
);

// Handling all errors
api.on('error', errorService.handleError);

export default app;
