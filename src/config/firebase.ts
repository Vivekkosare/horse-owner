import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();
// Initialize Firebase Admin SDK
// Ensure that the environment variables are set

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // Replace escaped newlines in the private key (important for multiline keys in .env)
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const db = admin.firestore();

export { db };
