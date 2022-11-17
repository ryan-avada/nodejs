import {Firestore} from '@google-cloud/firestore';
const firebase = require("firebase-admin");
const firestore = new Firestore();

/**
 * @documentation
 *
 * Only use one repository to connect to one collection, do not
 * try to connect more than one collection from one repository
 */
const settingsRef = firestore.collection('settings');

async function getSettings(shopID) {
  const settingDocs = await settingsRef
    .where('shopId', '==', shopID)
    .limit(1)
    .get();
  if (settingDocs.empty) {
    return null;
  }

  const settingDoc = settingDocs.docs[0];

  return {
    id: settingDoc.id,
    ...settingDoc.data()
  };
}

async function saveSettings(data, shopID) {
  const settingDocs = await settingsRef
    .where('shopId', '==', shopID)
    .limit(1)
    .get();
  //create new
  if (settingDocs.empty) {
    settingsRef.add({timestamp: firebase.firestore.FieldValue.serverTimestamp(),shopId: shopID, ...data});
    return true;
  }

  const settingDoc = settingDocs.docs[0];
  settingsRef.doc(settingDoc.id).set(data);
  return true;
}

module.exports = {
  getSettings,
  saveSettings
}
