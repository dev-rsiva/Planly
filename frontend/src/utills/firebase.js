// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1GeDlYDGDUIrIB5KZhgyB3QXI8M5azWA",
  authDomain: "planly-9fd62.firebaseapp.com",
  projectId: "planly-9fd62",
  storageBucket: "planly-9fd62.appspot.com",
  messagingSenderId: "605066926385",
  appId: "1:605066926385:web:02ea8faf603db5de427810",
  measurementId: "G-9JHKWKZ1Z2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
