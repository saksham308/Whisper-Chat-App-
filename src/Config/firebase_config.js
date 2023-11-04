// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTCjjzqIqH3Qz4gclouIdPQpv4Yh82mkI",
  authDomain: "fir-74b0c.firebaseapp.com",
  projectId: "fir-74b0c",
  storageBucket: "fir-74b0c.appspot.com",
  messagingSenderId: "200969203846",
  appId: "1:200969203846:web:7c14308ba5bb85944b6107",
  measurementId: "G-93GQEF9RK0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
