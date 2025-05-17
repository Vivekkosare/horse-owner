import admin from "firebase-admin";
import serviceAccountKey from "../../secrets/serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
});

const db = admin.firestore();

export { db };
