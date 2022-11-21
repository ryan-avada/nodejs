import {Firestore} from '@google-cloud/firestore';
const firestore = new Firestore();

/**
 * @documentation
 *
 * Only use one repository to connect to one collection, do not
 * try to connect more than one collection from one repository
 */
const collection = firestore.collection('settings');

/**
 *
 * @param shopID
 * @returns {Promise<(*&{id})|null>}
 */
export async function getSettings({shopID}) {
  const settingDocs = await collection
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

/**
 *
 * @param {object} data
 * @param {string} shopID
 * @returns {Promise<boolean>}
 */
export async function saveSettings({data, shopID}) {
  const settingDocs = await collection
    .where('shopId', '==', shopID)
    .limit(1)
    .get();
  //create new
  if (settingDocs.empty) {
    collection.add({timestamp: new Date(), shopId: shopID, ...data});
    return true;
  }

  const settingDoc = settingDocs.docs[0];
  await collection.doc(settingDoc.id).update(data);

  return true;
}
