import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEXVz8-p80Gl4KD7IadrvnIGj7k3mu2pU",
  authDomain: "hospitalagogo.firebaseapp.com",
  projectId: "hospitalagogo",
  storageBucket: "hospitalagogo.firebasestorage.app",
  messagingSenderId: "600746691358",
  appId: "1:600746691358:web:a03584a4a8a9533f96170f",
  measurementId: "G-SSLZ01DTYL"
};

// Initialize Firebase, checking if it is already initialized to support HMR safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
