// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "holograma-829a7.firebaseapp.com",
  projectId: "holograma-829a7",
  storageBucket: "holograma-829a7.firebasestorage.app",
  messagingSenderId: "857743046292",
  appId: "1:857743046292:web:834d5b7fd0b7a0fe1ba681",
  measurementId: "G-9QBSYCQ40H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export default app;