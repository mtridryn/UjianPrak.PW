import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_SECRET_KEY as string,
    authDomain: "ecommerce-15602.firebaseapp.com",
    projectId: "ecommerce-15602",
    storageBucket: "ecommerce-15602.firebasestorage.app",
    messagingSenderId: "60111683724",
    appId: "1:60111683724:web:281009553a38115e913ba9",
    measurementId: "G-EBJMQ9SCQC"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const provider = new GoogleAuthProvider();

export { app, auth, db, storage, provider };
