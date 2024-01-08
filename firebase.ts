import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRQZ31w6jmThP045hpgo0-YfhxnhaBtdQ",
  authDomain: "chatgpt-clone-8852d.firebaseapp.com",
  projectId: "chatgpt-clone-8852d",
  storageBucket: "chatgpt-clone-8852d.appspot.com",
  messagingSenderId: "749021201594",
  appId: "1:749021201594:web:16e41a9e56fe1726eaae83"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig); // singleton pattern

const db = getFirestore(app);

export { db }