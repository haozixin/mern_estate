// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-96579.firebaseapp.com",
  projectId: "mern-estate-96579",
  storageBucket: "mern-estate-96579.firebasestorage.app",
  messagingSenderId: "810621775128",
  appId: "1:810621775128:web:f47ab9648ef6c491e6426d",
  measurementId: "G-9DKLE00G92"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); 