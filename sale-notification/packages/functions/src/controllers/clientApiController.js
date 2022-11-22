import {getNotificationsByDomain} from "../repositories/notificationsRepository";
import {getSettings} from "../repositories/settingsRepository";
import {getDocByDomain} from "../repositories/generalRepository";

export async function get(ctx) {
  try {
    const {shopDomain} = ctx.query;
    const {shopId} = await getDocByDomain('shopInfos', shopDomain);

    const notifications = await getNotificationsByDomain(shopDomain);
    const settings = await getSettings({shopID: shopId});

    ctx.status = 200;
    return ctx.body = {
      notifications: notifications,
      settings: settings,
      success: true
    }
  } catch (e) {
    ctx.status = 404;
    return ctx.body = {
      notifications: {},
      settings: {},
      success: false,
      message: e
    }
  }
}
