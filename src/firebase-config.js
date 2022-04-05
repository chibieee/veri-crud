// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBagFVakKYLAcZ_lKK9EyIEwNZ98Yonpt0",
  authDomain: "crud-test-1306d.firebaseapp.com",
  projectId: "crud-test-1306d",
  storageBucket: "crud-test-1306d.appspot.com",
  messagingSenderId: "51376396780",
  appId: "1:51376396780:web:7059cce95b1da1fb3388c9",
  measurementId: "G-9TVHDNGX9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);