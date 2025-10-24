// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBifhKDvHan2MacWH46jL7Ijb6KNPy5ql8",
  authDomain: "phintrackr.firebaseapp.com",
  projectId: "phintrackr",
  storageBucket: "phintrackr.firebasestorage.app",
  messagingSenderId: "877441590841",
  appId: "1:877441590841:web:95cd15d73f5f8d259a8fe8",
  measurementId: "G-XJQQJW5J3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getFirestore(app)





