const {getNotifications} = require("../repositories/notificationsRepository");

/**
 *
 * @param ctx
 * @returns {Promise<{data: {}, success: boolean, message}|{data: *[], success: boolean}>}
 */
async function get(ctx) {
  try {
    const notifications = await getNotifications()

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

module.exports = {
  get
}
