const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

(async () => {
    const docRef = db.collection("products").doc('Jm2eHEc4EMsgbVsyxkwQ');
    return docRef.update({
        name: "Product 8"
    }).then(() => {
        console.log("Document successfully updated!");
    })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
})();