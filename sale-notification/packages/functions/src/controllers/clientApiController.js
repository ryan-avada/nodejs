// const {getNotifications} = require("../repositories/notificationsRepository");

async function get(ctx) {
  try {
    // const notifications = await getNotifications()
    ctx.status = 200;
    return ctx.body = {
      data: {},
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
