import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();

/**
 * @documentation
 *
 * Only use one repository to connect to one collection, do not
 * try to connect more than one collection from one repository
 */
const notificationsRef = firestore.collection('notifications');

async function getNotifications() {
  let resp = [];
  await notificationsRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      resp.push({id: doc.id,...doc.data(), timestamp: doc.data().timestamp.toDate()});
    });
  });

  return resp;
}

module.exports = {
  getNotifications
}
