// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-login-e134c.firebaseapp.com",
  projectId: "mern-login-e134c",
  storageBucket: "mern-login-e134c.appspot.com",
  messagingSenderId: "533293318582",
  appId: "1:533293318582:web:f9cb9359eb63fae3e60117"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);