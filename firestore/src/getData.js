const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

(async () => {
    const productDb = db.collection("products");
    const docRef = productDb.doc("0CSbEuAaGlwHB3C7ApUC");
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("-------------Get One-----------");
            console.log("Data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    const productRef = productDb.where('status','==','Out Stock')
        .get()
        .then((products) => {
            console.log('------ get product in stock -------')
            products.forEach((product) => {
                console.log(product.data())
            })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
})();