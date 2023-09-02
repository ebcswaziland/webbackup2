// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDns625k8bwUuNxw8f9mLVz_pH2956fWL8",
  authDomain: "ebc-app-aead3.firebaseapp.com",
  databaseURL: "https://ebc-app-aead3-default-rtdb.firebaseio.com",
  projectId: "ebc-app-aead3",
  storageBucket: "ebc-app-aead3.appspot.com",
  messagingSenderId: "789710588741",
  appId: "1:789710588741:web:b5b19e63a97625bada4c2c",
  measurementId: "G-YPVE7EW8HK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
export const auth2 = getAuth(app);
export default fireDB;
