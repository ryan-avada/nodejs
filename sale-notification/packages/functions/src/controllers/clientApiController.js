import {getNotificationsByDomain} from "../repositories/notificationsRepository";

export async function get(ctx) {
  try {
    const {shopDomain} = ctx.query;
    const notifications = await getNotificationsByDomain(shopDomain);

    ctx.status = 200;
    return ctx.body = {
      data: notifications,
      success: true
    }
  } catch (e) {
    ctx.status = 404;
    return ctx.body = {
      data: {},
      success: false,
      message: e
    }
  }
}
