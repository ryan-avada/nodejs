import {Firestore, Timestamp} from '@google-cloud/firestore';

const firestore = new Firestore();

/**
 *
 * @param collectionName
 * @param domain
 * @returns {Promise<null|*>}
 */
async function getDocByDomain(collectionName, domain) {
  const dataRef = firestore.collection(collectionName);
  const dataFilter = await dataRef
    .where('domain', '==', domain)
    .limit(1)
    .get();

  if (dataFilter.empty) {
    return null;
  }
  const dataDoc = dataFilter.docs[0];

  return {...dataDoc.data()};
}


module.exports = {
  getDocByDomain
}
