// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnwJoMB5HdBuHzgI-93DkEFSB4riigKF4",
  authDomain: "caruso-luciano.firebaseapp.com",
  projectId: "caruso-luciano",
  storageBucket: "caruso-luciano.appspot.com",
  messagingSenderId: "280166378808",
  appId: "1:280166378808:web:42e87f70bb236baea225cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {db, auth, storage};