import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,  } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjm5bJWBoMkyvHys7CjA_Uw3yfxPnzZzw",
  authDomain: "sruthi3-46a29.firebaseapp.com",
  projectId: "sruthi3-46a29",
  storageBucket: "sruthi3-46a29.appspot.com",
  messagingSenderId: "976815054244",
  appId: "1:976815054244:web:05147ef482d076cff2b531",
  measurementId: "G-TP5D6DTY36"
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

// const storage = getStorage(app);
// const db = getFirestore();

const imgDB = getStorage(app)
const txtDB = getFirestore(app)

export { app, auth, imgDB, txtDB  }