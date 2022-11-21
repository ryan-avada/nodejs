const {getCurrentUserInstance} = require("../helpers/auth");
const {getSettings, saveSettings} = require("../repositories/settingsRepository");

/**
 *
 * @param ctx
 * @returns {Promise<{data: {}, success: boolean, message}|{data: (*|null), success: boolean}>}
 */
async function get(ctx) {
  try {
    const {shopID} = await getCurrentUserInstance(ctx);
    const settings = await getSettings({shopID: shopID})

    ctx.status = 200;
    return ctx.body = {
      data: settings,
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

/**
 *
 * @param ctx
 * @returns {Promise<{data: {}, success: boolean, message}|{data: boolean, success: boolean}>}
 */
async function update(ctx) {
  try {
    const {shopID} = await getCurrentUserInstance(ctx);
    const postData = ctx.req.body;

    const settingsResp = await saveSettings({data: postData, shopID: shopID})

    ctx.status = 200;
    return ctx.body = {
      success: true,
      data: settingsResp
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
  get,
  update
}
