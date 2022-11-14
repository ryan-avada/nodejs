const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

(async () => {
    const docRef = db.collection("products").doc('Jm2eHEc4EMsgbVsyxkwQ');
    //remove document
    docRef.delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });

    //remove field
     await docRef.update({
         timestamp: admin.firestore.FieldValue.delete()
     })
})();