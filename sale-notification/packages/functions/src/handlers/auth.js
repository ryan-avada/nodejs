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
import Shopify from 'shopify-api-node';
import {addNotification, getNotificationItem} from "../repositories/notificationsRepository";
import {getDocByDomain} from "../repositories/generalRepository";
import {createDefaultSetting, createWebhook, syncOrders} from "../services/InstallationService";

if (firebase.apps.length === 0) {
  firebase.initializeApp();
}

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
        const shopData = await getDocByDomain('shops', shopDomain);
        const shopID = shopInfo.shopId;

        const shopify = new Shopify({
          shopName: shopDomain,
          accessToken: shopData.accessToken
        })
        // sync 30 order

        //Goi 30 order
        // lay ra list prduct Id
        // Unique list product id
        // Goi 1 API call lay du product data
        // merge 2 array orders vaf products

        // shopify.order
        //   .list({limit: 30})
        //   .then((order) => {
        //     order.map(async (ord) => {
        //       const data = await getNotificationItem(shopify, ord);
        //       await addNotification({shopId: shopID, shopifyDomain: shopDomain, data: data})
        //     })
        //   })
        //   .catch((err) => console.log(err))
        // syncNotificationsFromOrders(orders)

        await Promise.all([
          createWebhook(shopify),
          //   createScripttag(),
          syncOrders({shopify: shopify, shopId: shopID, shopifyDomain: shopDomain}),
          createDefaultSetting(shopID)
        ])

      } catch (e) {
        console.error(e)
      }
    }
  }).routes()
);

// Handling all errors
api.on('error', errorService.handleError);

export default app;
