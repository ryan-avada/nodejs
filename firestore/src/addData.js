const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

(async () => {
    const colRef = db.collection("products")
    colRef.add({
        name: "Product Name 7",
        price: 100,
        description: "Description 7",
        status: "In Stock",
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
})();