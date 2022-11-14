const functions = require("firebase-functions");
const apiHandler = require('./handlers/api');
const webhookHandler = require('./handlers/webhook');

exports.api = functions.https.onRequest(apiHandler.callback());
exports.webhook = functions.https.onRequest(webhookHandler.callback());